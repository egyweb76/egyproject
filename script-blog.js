let matchData = {}; // تعريف متغير لتخزين بيانات المباريات

// دالة لجلب بيانات المباريات من ملف JSON
function loadMatchData() {
    const repoOwner = 'egyweb76'; // صاحب المستودع
    const repoName = 'egyproject'; // اسم المستودع
    const filePath = 'moled-blog.json'; // مسار الملف داخل المستودع

    // بناء رابط ملف raw
    const url = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${filePath}`;

    // جلب محتوى السكربت
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // تحميل النص
        })
        .then(scriptContent => {
            const script = document.createElement('script');
            script.textContent = scriptContent; // إدراج النص ككود JavaScript
            document.head.appendChild(script); // إضافة السكربت إلى الصفحة
        })
        .catch(error => {
            console.error('Error loading the script:', error);
        });
}

// دالة لتعيين التاب النشط
function setActiveTab(activeTab) {
    const allTabs = document.querySelectorAll('.tab-button');
    allTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
}

// دالة لتحويل رقم اليوم إلى اسم اليوم باللغة العربية
function getDayName(dateString) {
    const days = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const date = new Date(dateString);
    return days[date.getDay()];
}

// دالة لتحديث العنوان بناءً على اليوم والتاريخ
function setDayAndDateInTitle(dateString) {
    const titleElement = document.querySelector('.titleG');
    const dayName = getDayName(dateString);
    titleElement.innerText = `مباريات يوم ${dayName}`;
}

// دالة للتحقق مما إذا كان التوقيت الصيفي مفعلًا في مصر بناءً على تواريخ محددة
function isDaylightSavingTimeInEgypt(date) {
    const year = date.getFullYear();

    const aprilLastFriday = new Date(year, 4, 30);
    while (aprilLastFriday.getDay() !== 5) {
        aprilLastFriday.setDate(aprilLastFriday.getDate() - 1);
    }

    const octoberLastThursday = new Date(year, 10, 31);
    while (octoberLastThursday.getDay() !== 4) {
        octoberLastThursday.setDate(octoberLastThursday.getDate() - 1);
    }

    return date >= aprilLastFriday && date < octoberLastThursday;
}

// دالة لحساب الوقت حسب التوقيت المصري الصيفي أو الشتوي
function adjustTimeForEgypt(date) {
    date.setHours(0, 0, 0, 0);
    const hoursToAdd = isDaylightSavingTimeInEgypt(date) ? 3 : 2;
    return new Date(date.getTime() + (hoursToAdd * 60 * 60 * 1000));
}

// دالة لإنشاء التواريخ في التابات
function createTabs() {
    const tabsContainer = document.getElementById('tabs-container');
    tabsContainer.innerHTML = ''; // مسح التابات القديمة

    // الحصول على التاريخ الحالي
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const egyptTime = adjustTimeForEgypt(today);

    // إنشاء مصفوفة التواريخ لتشمل التاريخ الحالي ويومان قبله ويومان بعده
    const dates = [];
    for (let i = -2; i <= 2; i++) {
        const date = new Date(egyptTime);
        date.setDate(egyptTime.getDate() + i); // إضافة أو طرح الأيام بناءً على i
        const formattedDate = date.toISOString().split('T')[0].replace(/-/g, '/'); // تنسيق التاريخ
        dates.push(formattedDate);
    }

    // إضافة التابات بناءً على التواريخ المحسوبة
    dates.forEach((date, index) => {
        const tab = document.createElement('button');
        tab.classList.add('tab-button');
        tab.innerHTML = `
            <div>${getDayName(date)}</div>
            <div>${date}</div>
        `;
        tab.style.display = 'flex';
        tab.style.flexDirection = 'column';
        tab.style.alignItems = 'center';

        tab.onclick = function () {
            loadMatchesForDate(date);
            setActiveTab(tab);
            setDayAndDateInTitle(date);
        };

        tabsContainer.appendChild(tab);

        if (index === 2) {
            tab.classList.add('active');
            loadMatchesForDate(date);
            setDayAndDateInTitle(date);
        }
    });
}

// دالة لتحميل المباريات لتاريخ محدد
function loadMatchesForDate(dateString) {
    const matches = matchData[dateString]; // جلب المباريات من البيانات
    const matchesContainer = document.getElementById('matches-container');
    const loading = document.getElementById('loading');
    const noMatchesMessage = document.getElementById('no-matches');

    // إظهار مؤشر التحميل في البداية
    loading.classList.remove('d-none');

    matchesContainer.innerHTML = '';

    if (matches && matches.length > 0) {
        noMatchesMessage.style.display = 'none';

        const totalMatches = matches.length; // حساب العدد الإجمالي للمباريات
        // عرض العدد الإجمالي للمباريات
        const statsContainer = document.getElementById('stats-container');
        statsContainer.innerHTML = `<p>📺 ${totalMatches} مباراة</p>`;

        const currentTime = new Date(); // الحصول على الوقت الحالي

        matches.forEach(match => {
            const matchStartTime = new Date(match.timeStart);
            const matchEndTime = new Date(match.timeEnd);
            let status = '';

            // تحديد حالة المباراة بناءً على الوقت الحالي
            const timeDiff = matchStartTime - currentTime; // الفرق في الوقت بين بدء المباراة والوقت الحالي

            if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
                status = 'started'; // المباراة ستبدأ قريباً (خلال 30 دقيقة)
            } else if (currentTime < matchStartTime) {
                status = 'notstarted'; // المباراة لم تبدأ بعد
            } else if (currentTime >= matchStartTime && currentTime <= matchEndTime) {
                status = 'running'; // المباراة جارية
            } else {
                status = 'ended'; // المباراة انتهت
            }

            function getCurrentYearMonth() {
                const now = new Date();
                const year = now.getFullYear();
                const month = (now.getMonth() + 1).toString().padStart(2, '0');
                return `${year}/${month}`;
            }
            const matchId = match.id || 'default';
            var currentUrl = 'https://sport.coldady.com/';
            const matchLink = `${currentUrl}/${getCurrentYearMonth()}/${matchId}.html`;

            const matchElement = `
                <div class="m_block egy_sports_item ${status}">
                    <a href="${matchLink}" class="ElGadwl" title="${match.fareq1.name} ضد ${match.fareq2.name} فى ${match.btola}">
                        <div class="competition-info"><span class="competition-n-img">${match.btola}
                            <img alt="${match.btola}" src="${match.btolaImage}"  width="24" />
                            </span>
                        </div>
                        <div class="Gadwl-Top">
                            <div class="Fareeq-r">
                                <img alt="${match.fareq1.name}" src="${match.fareq1.logo}" />
                                <span>${match.fareq1.name}</span>
                            </div>
                            <div class="Fareeq-c">
                                <span class="bouton">
                                    <p id="msmsma"><img src="https://media.tenor.com/cnb4G0hjQmwAAAAj/writing-loading.gif" alt="loading" height="18" /></p>
                                </span>
                                <div>
                                    <div class="fc_time">
                                        <span id="hdaf1">${match.score.team1}</span> - <span id="hdaf2">${match.score.team2}</span>
                                        ${match.penalties && (match.penalties.team1 !== 0 || match.penalties.team2 !== 0) ? `
                                        <div class="penalties">
                                        <span>${match.penalties.team1}</span> <span class="penalties-title">ركلات الترجيح</span> <span>${match.penalties.team2}</span>
                                        </div>` : ''}
                                    </div>
                                    <div class="date stay" data-start="${match.timeStart}" data-gameends="${match.timeEnd}" id="${match.id}"></div>
                                    <div class="timer-status">
                                        <span class="timer"></span>
                                        <span class="status"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="Fareeq-l">
                                <img alt="${match.fareq2.name}" src="${match.fareq2.logo}" />
                                <span>${match.fareq2.name}</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;
            matchesContainer.innerHTML += matchElement;
        });
        // إخفاء مؤشر التحميل بعد عرض المباريات
        loading.classList.add('d-none');

        // تحميل السكربت الخارجي
        $.getScript("https://raw.githack.com/egyweb76/egyproject/main/custom-blog.js")
            .done(function (script, textStatus) {
                console.log("Script loaded successfully: " + textStatus);
                // استدعاء دالة الفرز بعد تحميل السكربت
                setTimeout(() => {
                    sortMatches();
                }, 100);
            })
            .fail(function (jqxhr, settings, exception) {
                console.error("Error loading script: " + exception);
            });

    } else {
        noMatchesMessage.style.display = 'block'; // عرض رسالة عدم وجود مباريات
        // إخفاء مؤشر التحميل بعد عرض المباريات
        loading.classList.add('d-none');
    }
}

// دالة لترتيب المباريات حسب حالتها
function sortMatches() {
    const matchesContainer = document.getElementById('matches-container');
    const matches = Array.from(matchesContainer.getElementsByClassName('egy_sports_item'));

    const order = {
        'running': 1,
        'started': 2,
        'notstarted': 3,
        'ended': 4
    };

    matches.sort((a, b) => {
        // تحديد الحالة لكل مباراة
        const aClass = Object.keys(order).find(key => a.classList.contains(key)) || 'ended';
        const bClass = Object.keys(order).find(key => b.classList.contains(key)) || 'ended';

        // مقارنة الحالة أولًا
        const stateComparison = order[aClass] - order[bClass];
        if (stateComparison !== 0) {
            return stateComparison; // ترتيب حسب الحالة إذا كانت مختلفة
        }

        // إذا كانت الحالة متساوية، ترتيب حسب التوقيت التصاعدي
        const aTime = parseTimeString(a.querySelector('.fc_time span#time')?.textContent || '');
        const bTime = parseTimeString(b.querySelector('.fc_time span#time')?.textContent || '');

        return aTime - bTime; // ترتيب حسب الوقت
    });

    // تفريغ الحاوية ثم إضافة المباريات بالترتيب الجديد
    matchesContainer.innerHTML = '';
    matches.forEach(match => matchesContainer.appendChild(match));
}

// دالة لتحويل النصوص الزمنية (مثل 2:30 أو 3:00) إلى أرقام Timestamp
function parseTimeString(timeStr) {
    const normalizedTime = timeStr.trim().replace(/(AM|PM)/, '').trim();
    const [hours, minutes] = normalizedTime.split(':').map(Number);
    const now = new Date();
    now.setHours(hours, minutes, 0, 0);
    return now.getTime();
}

// استدعاء الدالة لجلب بيانات المباريات عند تحميل الصفحة
loadMatchData();

// تعيين مؤقت لتحديث البيانات عند الساعة 12:00 صباحاً
setInterval(function () {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
        loadMatchesForDate(new Date().toISOString().split('T')[0].replace(/-/g, '/'));
    }
}, 60000);
