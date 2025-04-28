///////////////////////////////////////////////////////
////////////////////////////////////////////////////
function openTabs(evt, tabsyName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabsyName).style.display = "flex";
    evt.currentTarget.className += " active";
}

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
function checkTime(showTime, hideTime, iframeSrc) {
  const now = new Date();

  // عرض iframe وإخلاء المسئولية إذا كنا في الوقت المحدد أو بعده وقبل ساعتين من الوقت المحدد
  if (now >= showTime && now <= hideTime) {
    if ($("#myIframe").attr('src') === '') {
      $("#myIframe").attr('src', iframeSrc); // تعيين مصدر iframe
      document.getElementById('myIframe').style.display = 'block'; // إظهار iframe
      document.getElementById('disclaimer').style.display = 'block'; // إظهار إخلاء المسئولية
    }
  } 
  // إخفاء iframe وإخلاء المسئولية بعد مرور الساعتين
  else if (now > hideTime) {
    document.getElementById('myIframe').style.display = 'none'; // إخفاء iframe
    document.getElementById('disclaimer').style.display = 'none'; // إخفاء إخلاء المسئولية
    $("#myIframe").attr('src', ''); // إزالة مصدر iframe
  }
}

// استدعاء checkTime كل دقيقة
function startTimer(showTime, hideTime, iframeSrc) {
  setInterval(function() {
    checkTime(showTime, hideTime, iframeSrc);
  }, 60000);  // كل 60 ثانية (دقيقة واحدة)

  // التحقق الفوري عند تحميل الصفحة
  checkTime(showTime, hideTime, iframeSrc);
}
////////////////////////////////////////////////////////////
// ملف fetch-element.js دالة عرض ترتيب الفرق والهدافين
 async function loadTable(link) {
     try {
         // جلب البيانات من الرابط المتغير
         const response = await fetch(link);
         const standings = await response.json();

         if (!Array.isArray(standings) || standings.length === 0) {
             console.error('لا توجد بيانات للترتيب.');
             return;
         }

         // إضافة الجدول داخل الـ div مباشرة
         const resultDiv = document.getElementById('result-jdwel');
         resultDiv.innerHTML = `
            <table class="standings_jdwel">
                <thead>
                    <tr>
                        <th colspan="3" class="team">فريق</th>
                        <th class="pld">لعب</th>
                        <th class="won">فاز</th>
                        <th class="draw">تعادل</th>
                        <th class="lost">خسر</th>
                        <th class="match-left">متبقي</th>
                        <th class="goal-plus-minus" role="gridcell" aria-label="له وعليه">+/-</th>
                        <th class="diff">فرق</th>
                        <th class="pts">نقاط</th>
                    </tr>
                </thead>
                <tbody id="table-body">
                    <!-- سيتم تعبئة الجدول هنا تلقائياً -->
                </tbody>
            </table>
        `;

         const tbody = document.getElementById('table-body');
         standings.forEach((team, index) => {
             const remainingMatches = 38 - parseInt(team.played);
             const diffGoals = parseInt(team.goals_for) - parseInt(team.goals_against);

             const rowClass = (index % 2 === 0) ? 'odd' : 'even';

             const row = `
                <tr id="o_${index + 1}" class="${rowClass}">
                    <td class="rank">
                        <div class="rank_guide" style="background-color:#037aff"></div> 
                        <span>${team.rank}</span>
                    </td>
                    <td class="team_logo">
                        <img src="${team.team_logo}" width="30" height="30" loading="lazy">
                    </td>
                    <td class="team">
                        <div>${team.team}</div>
                    </td>
                    <td class="pld">${team.played}</td>
                    <td class="won">${team.wins}</td>
                    <td class="draw">${team.draws}</td>
                    <td class="lost">${team.losses}</td>
                    <td class="match-left">${remainingMatches}</td>
                    <td class="goal-plus-minus">
                        <span class="goal-minus">${team.goals_against}</span>:<span class="goal-plus">${team.goals_for}</span>
                    </td>
                    <td class="diff">${diffGoals}</td>
                    <td class="pts"><strong>${team.points}</strong></td>
                </tr>
            `;
             tbody.insertAdjacentHTML('beforeend', row);
         });
     } catch (error) {
         console.error('خطأ أثناء جلب بيانات الترتيب:', error);
     }
 }
