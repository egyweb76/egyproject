import schedule
import time
import calendar
from datetime import datetime, timedelta
import requests
from bs4 import BeautifulSoup
import os
import json
from collections import defaultdict
from urllib.parse import urljoin, urlparse  # إضافة urlparse هنا
import uuid
import logging

# إعداد ملف السجل لتتبع الأخطاء والمعلومات
#logging.basicConfig(filename='match_updates.log', level=logging.INFO, 
#                    format='%(asctime)s - %(levelname)s - %(message)s')

# دالة لتوليد التواريخ لمدة الشهر الحالي
def generate_dates():
    today = datetime.now()
    year = today.year
    month = today.month

    # الحصول على عدد الأيام في الشهر الحالي
    _, days_in_month = calendar.monthrange(year, month)

    # تحديد بداية الشهر
    start_of_month = datetime(year, month, 1)

    # توليد قائمة تواريخ تبدأ من اليوم الأول وحتى اليوم الأخير من الشهر
    dates = [(start_of_month + timedelta(days=i)).strftime("%Y/%m/%d") for i in range(days_in_month)]
    return dates

# اختبار الكود
print(generate_dates())

# دالة لمعالجة وقت المباراة مع إضافة التاريخ المناسب
def process_match_time_with_date(raw_time, match_date):
    try:
        # تعديل الوقت إذا كان 00:00 ص أو تنسيق 24 ساعة
        if raw_time.strip() in ["00:00 AM", "00:00", "00:00 ص"]:
            raw_time = "12:00 AM"

        # استبدال التنسيقات العربية
        time_clean = raw_time.replace("م", "PM").replace("ص", "AM").strip()

        # التحقق من التنسيق ومعالجة الوقت
        if ":" in time_clean and ("AM" in time_clean or "PM" in time_clean):
            # نظام 12 ساعة
            match_time = datetime.strptime(time_clean, "%I:%M %p")
        else:
            # نظام 24 ساعة
            match_time = datetime.strptime(time_clean, "%H:%M")

        # دمج الوقت مع التاريخ
        hour = match_time.strftime('%I')  # الحصول على الساعة بتنسيق 12 ساعة
        if hour.startswith('0'):  # إذا كانت الساعة أقل من 10
            hour = hour[1:]  # إزالة الصفر البادئ
        full_start_time = f"{match_date} {hour}:{match_time.strftime('%M %p')}"

        # حساب وقت النهاية
        end_time = match_time + timedelta(hours=2)
        end_hour = end_time.strftime('%I')
        if end_hour.startswith('0'):
            end_hour = end_hour[1:]

        # معالجة الانتقال إلى اليوم الجديد
        match_datetime = datetime.strptime(f"{match_date} {match_time.strftime('%H:%M')}", "%Y/%m/%d %H:%M")
        end_datetime = match_datetime + timedelta(hours=2)
        end_date = end_datetime.strftime("%Y/%m/%d")  # تحديث التاريخ إذا تغير

        # صياغة وقت النهاية
        full_end_time = f"{end_date} {end_hour}:{end_time.strftime('%M %p')}"

        return full_start_time, full_end_time

    except ValueError as e:
        logging.error(f"Invalid time format encountered: {raw_time} - {e}")
        return f"{match_date} 12:00 AM", f"{match_date} 02:00 AM"  # وقت افتراضي


# دالة لتنظيف روابط الصور
def clean_url(url):
    return url.split('?')[0]

# دالة لتحميل البيانات
def fetch_and_process_matches():
    try:
        logging.info("Starting data fetching process...")
        data_by_date = defaultdict(list)
        dates = generate_dates()

        # قراءة البيانات القديمة من الملف (إذا كانت موجودة)
        existing_data = {}
        if os.path.exists('moled-blog.json') and os.path.getsize('moled-blog.json') > 0:
            with open('moled-blog.json', 'r', encoding='utf-8') as f:
                existing_data = json.load(f)
        
        # المرور على التواريخ لجلب البيانات
        for date in dates:
            url = f"https://www.so3ody.com/matches/{date}"
            response = requests.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            matches = soup.find_all('div', class_='round-box')
            
            # تحديد الرابط الأساسي للموقع (base URL)
            base_url = "https://www.so3ody.com"

            for match_table in matches:
                competition_element = match_table.find('a', title=True)
                btola_name = competition_element['title'] if competition_element else "اسم البطولة غير متوفر"
                competition_logo = competition_element.find('img')
                btola_image_url = urljoin(base_url, competition_logo.get('data-src', "")) if competition_logo else "https://media.gemini.media/img/yallakora/IOSTeams/YK-Generic-team-logo.png"          
                
                match_items = match_table.find_all('div', class_='pair-match-crad')

                # تحديث قسم استخراج البيانات داخل fetch_and_process_matches
                for item in match_items:
                    # استخراج رابط المباراة
                    match_link = item.find('a', class_='match-card-wide__btn btn btn--primary')
                    if match_link:
                        match_url = match_link.get('href', '')
                        # استخراج المعرف من الرابط
                        match_id = match_url.split('/')[-1]  # المعرف سيكون آخر جزء من الرابط بعد '/'
                    else:
                        match_id = 0  # إذا لم يوجد رابط، تعيين المعرف إلى 0

                    match_data = {
                        "id": int(match_id) if match_id.isdigit() else 0,
                        "gameUrl": "",
                        "postImage": "",
                        "fareq1": {},
                        "fareq2": {},
                        "btola": btola_name,
                        "btolaImage": btola_image_url,
                        "channel": "",
                        "caller": "",
                        "timeStart": "",
                        "timeEnd": "",
                        "status": "",
                        "round": "",
                        "iframeSrc": "",
                        "score": {"team1": None, "team2": None},
                        "penalties": {"team1": None, "team2": None}
                    }
                    
                    # استخراج عنصر الجولة
                    round_element = item.find('span', class_='match-card-wide__round')
                    if round_element:
                        round_text = round_element.text.strip()
                        match_data['round'] = round_text
                    else:
                        match_data['round'] = "غير معروف"
                    
                    # استخراج اسم المعلق
                    commentator_element = item.find('div', class_='card-speeker-name')
                    if commentator_element:
                        commentator_name = commentator_element.find('span').text.strip()
                        match_data['caller'] = commentator_name
                    else:
                        match_data['caller'] = "غير معروف"

                    # استخراج بيانات الفريق الأول
                    team1 = item.find('a', class_='match-card-wide__team teamA')
                    if team1:
                        team1_logo = team1.find('img')
                        match_data['fareq1'] = {
                            "name": team1.find('p', class_='match-card-wide__text').text.strip() if team1.find('p', class_='match-card-wide__text') else None,
                            "logo": urljoin(base_url, team1_logo.get('data-src', "")) if team1_logo else "افتراضي للفريق الأول"
                        }

                    # استخراج بيانات الفريق الثاني
                    team2 = item.find('a', class_='match-card-wide__team teamB')
                    if team2:
                        team2_logo = team2.find('img')
                        match_data['fareq2'] = {
                            "name": team2.find('p', class_='match-card-wide__text').text.strip() if team2.find('p', class_='match-card-wide__text') else None,
                            "logo": urljoin(base_url, team2_logo.get('data-src', "")) if team2_logo else "افتراضي للفريق الثانى"
                        }

                    # وقت المباراة
                    time = item.find('div', class_='match-card-wide__time time-zone')
                    if time:
                        raw_time = time.text.strip()
                        if raw_time:
                            match_data['timeStart'], match_data['timeEnd'] = process_match_time_with_date(raw_time, date)
                        else:
                            logging.info(f"Empty time found for match on date {date}")
                            match_data['timeStart'], match_data['timeEnd'] = "Invalid time", "Invalid time"
                    else:
                        logging.info(f"Time element missing for match on date {date}")
                        match_data['timeStart'], match_data['timeEnd'] = "Invalid time", "Invalid time"


                    # حالة المباراة
                    status_element = item.find('div', class_='match-card-wide__time')
                    if status_element:
                        match_data['status'] = status_element.text.strip()  # الحالة مباشرة دون تعديل

                    # القناة الناقلة
                    channel_element = item.find('div', class_='card-title')
                    if channel_element:
                        channel_name = channel_element.find('span')
                        if channel_name and channel_name.text.strip():  # التحقق من وجود النص داخل العنصر
                            match_data['channel'] = channel_name.text.strip()
                        else:
                            match_data['channel'] = "غير معروفة"
                    else:
                        match_data['channel'] = "لم تحدد بعد"

                    # النتائج
                    result_element = item.find('div', class_='match-card-wide__result')
                    if result_element:
                        result_text = result_element.text.strip()
                        scores = result_text.split(':')
                        if len(scores) == 2:
                            match_data['score'] = {
                                "team1": int(scores[0].strip()) if scores[0].strip().isdigit() else "0",
                                "team2": int(scores[1].strip()) if scores[1].strip().isdigit() else "0"
                            }
                    # استخراج نتيجة ضربات الترجيح
                    penalty_element = item.find('div', class_='summary-box__penalty')
                    if penalty_element:
                        # استخراج القيم للفريقين
                        team_a_penalty_element = penalty_element.find('span', class_='team-penalty team-A')
                        team_b_penalty_element = penalty_element.find('span', class_='team-penalty team-B')

                        if team_a_penalty_element and team_b_penalty_element:
                            # قراءة النصوص وتحويلها إلى أرقام
                            team_a_penalty = int(team_a_penalty_element.text.strip()) if team_a_penalty_element.text.strip().isdigit() else 0
                            team_b_penalty = int(team_b_penalty_element.text.strip()) if team_b_penalty_element.text.strip().isdigit() else 0

                            # تخزين النتيجة في بيانات المباراة
                            match_data['penalties'] = {
                                "team1": team_a_penalty,
                                "team2": team_b_penalty
                            }
                        else:
                            # إذا لم تكن هناك ضربات ترجيح، إضافة قيمة فارغة أو "لا توجد ضربات ترجيح"
                            match_data['penalties'] = {
                                "team1": 0,
                                "team2": 0
                            }
                    else:
                        # إذا لم يكن هناك عنصر للضربات الترجيحية
                        match_data['penalties'] = {
                            "team1": 0,
                            "team2": 0
                        }


                    # التعامل مع التحديثات فقط للحقول caller و status و score
                    match_found = False
                    if date in existing_data:
                        for old_match in existing_data[date]:
                            if old_match['id'] == match_data['id']:
                                old_match.update({
                                    "caller": match_data['caller'],
                                    "channel": match_data['channel'],
                                    "status": match_data['status'],
                                    "score": match_data['score'],
                                    "penalties": match_data['penalties'],
                                })
                                match_found = True
                                break
                    if not match_found:
                        data_by_date[date].append(match_data)

        # ترتيب المباريات حسب الوقت
        for date in data_by_date:
            data_by_date[date] = sorted(data_by_date[date], key=lambda x: datetime.strptime(x['timeStart'], "%Y/%m/%d %I:%M %p") if x['timeStart'] != "Invalid time" else datetime.max)

        # دمج البيانات الجديدة مع البيانات القديمة
        for date, matches in data_by_date.items():
            if date in existing_data:
                for new_match in matches:
                    match_found = False
                    for old_match in existing_data[date]:
                        if old_match['id'] == new_match['id']:  # تحقق من وجود المباراة
                            # تحديث القيم المطلوبة فقط
                            old_match.update({
                                "caller": new_match.get("caller", old_match["caller"]),
                                "channel": new_match.get("channel", old_match["channel"]),
                                "status": new_match.get("status", old_match["status"]),
                                "score": new_match.get("score", old_match["score"]),
                                "penalties": new_match.get("penalties", old_match["penalties"]),  # تحديث الضربات الترجيحية
                            })
                            # الحفاظ على حقل الوقت دون تغييره
                            old_match["time"] = old_match["time"]
                            match_found = True
                            break
                    if not match_found:
                        # إذا لم يتم العثور على المباراة، أضفها كمدخل جديد
                        existing_data[date].append(new_match)
            else:
                # إذا لم يكن التاريخ موجودًا في البيانات القديمة، أضف جميع المباريات الجديدة
                existing_data[date] = matches


        # كتابة البيانات إلى ملف JSON
        with open('moled-blog.json', 'w', encoding='utf-8') as f:
            json.dump(existing_data, f, indent=4, ensure_ascii=False)

        print("Matches extracted and stored by date in JSON file successfully!")

    except Exception as e:
        logging.error(f"Error occurred during data fetching: {e}")
# fetch_and_process_matches()
schedule.every(1).minutes.do(fetch_and_process_matches)
#
## جدولة المهمة لتحديث البيانات مرة واحدة يوميًا
##schedule.every().day.at("00:05").do(fetch_and_process_matches)
#
## بدء حلقة التكرار
while True:
    schedule.run_pending()
    time.sleep(60)
