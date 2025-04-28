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

// الدالة لجلب وعرض العنصر تلقائيًا
async function fetchElement(url, elementType, elementIdOrClass = '') {
  // إعداد المحدد (selector) بناءً على نوع العنصر وclass أو id
  let selector = elementType;
  if (elementIdOrClass) {
    if (elementIdOrClass.startsWith("#") || elementIdOrClass.startsWith(".")) {
      selector += elementIdOrClass;
    } else {
      selector += elementIdOrClass.includes(" ") ? `.${elementIdOrClass}` : `#${elementIdOrClass}`;
    }
  }

  try {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.contents;

    // تحويل النص إلى DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    // البحث عن العنصر باستخدام المحدد
    const element = doc.querySelector(selector);

    if (element) {
      // تعديل روابط الصور وتحويل الروابط النسبية إلى مطلقة
      const images = element.querySelectorAll('img');
      images.forEach(img => {
        // تحويل الروابط النسبية إلى مطلقة
        if (img.src.startsWith('/')) {
          img.src = `https://jdwel.com${img.src}`;
        }
        // تمرير الروابط من خلال الوكيل
        img.src = `https://api.allorigins.win/raw?url=${encodeURIComponent(img.src)}`;

        // إزالة خاصية alt لتجنب التأثير على العرض
        img.removeAttribute('alt');

        // إضافة صورة بديلة في حالة عدم تحميل الصورة الأصلية
        img.onerror = function() {
          this.src = 'https://media.gemini.media/img/yallakora/IOSTeams/YK-Generic-team-logo.png'; // رابط الصورة البديلة
        };
      });

      // إظهار العنصر في صفحة HTML
      document.getElementById('result-element').innerHTML = element.outerHTML;
    } else {
      document.getElementById('result-element').innerHTML = "العنصر غير موجود!";
    }
  } catch (error) {
    console.error("Error fetching the element: ", error);
    document.getElementById('result-element').innerHTML = "حدث خطأ أثناء جلب العنصر!";
  }
}

