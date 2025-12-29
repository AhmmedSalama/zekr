'use client'

import Image from "next/image"
import { useState, useEffect, useRef, useMemo } from "react"
import BestreadersSlider from "./BestreadersSlider"

type LessonType = {
  id: number
  name: string
  reader: string
  duration: string
  currentTime: string
  img: string  
}

type TafsirSora = {
  id: number
  tafsir_id: number
  name: string
  url: string
  sura_id: number
}

type FiqhLesson = {
  id: number
  title: string
  content: string
}

type ApiLecture = {
  id: number
  title: string
  description: string
  attachments?: Array<{
    url: string
    size: number
  }>
}

const lessonsList: LessonType[] = [
  { id: 1, name: "دروس قصيرة",   reader: "الشيخ أبو إسحاق الحويني", duration: "35:22",  currentTime: "12:10", img:"/library.webp"},
  { id: 2, name: "السيرة النبوية", reader: "الشيخ أبو إسحاق الحويني", duration: "45:18",  currentTime: "18:05", img:"/muslim.webp"},
  { id: 3, name: "تفسير القرآن",  reader: "الخلاصة من تفسير الطبري", duration: "55:03",  currentTime: "25:30", img:"/book-open-01.webp"},
  { id: 4, name: "محاضرات عامة",  reader: "الشيخ أبو إسحاق الحويني", duration: "2:48:15", currentTime: "1:25:30", img:"/book-open-01.webp"},
  { id: 5, name: "فقه العبادات",  reader: "الشيخ أبو إسحاق الحويني", duration: "1:15:40", currentTime: "0:45:10", img:"/hand-prayer.webp"},
]

const fiqhLessons: FiqhLesson[] = [
  { 
    id: 1, 
    title: "الطهارة والوضوء", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تعريف الطهارة</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الطهارة في اللغة تعني النقاء والنظافة، وفي الشريعة الإسلامية تدل على رفع الحدث وإزالة النجس. وتُعد الطهارة شرطاً لازماً لأداء العديد من العبادات، وخاصة الصلاة التي لا تصح إلا بوجود طهارة كاملة.</p>
      </div>
      
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تعريف الوضوء</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed"><strong>لغة:</strong> مشتق من الوضاءة؛ وهي الحسن والنظافة.</p>
        <p class="text-[#FAFAFAB2] leading-relaxed mt-2"><strong>شرعاً:</strong> استعمال الماء في الأعضاء الأربعة - وهي الوجه واليدان والرأس والرجلان - على صفة مخصوصة في الشرع، على وجه التعبد لله تعالى.</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">حكم الوضوء</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">واجب على المحدث إذا أراد الصلاة وما في حكمها؛ كالطواف ومس المصحف. قال تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ﴾ [المائدة: 6]</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فروض الوضوء الستة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>غسل الوجه بكامله (ومنه المضمضة والاستنشاق)</li>
          <li>غسل اليدين إلى المرفقين</li>
          <li>مسح الرأس كله مع الأذنين</li>
          <li>غسل الرجلين إلى الكعبين</li>
          <li>الترتيب بين الأعضاء</li>
          <li>الموالاة (عدم التأخير بين غسل الأعضاء)</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فضائل الوضوء</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>تكفير الذنوب: قال ﷺ: "من توضأ فأحسن الوضوء، خرجت خطاياه حتى تخرج من تحت أظفاره"</li>
          <li>سبب لدخول الجنة: "من توضأ نحو وضوئي هذا، ثم قام وصلى ركعتين، وجبت له الجنة"</li>
          <li>علامة لهذه الأمة يوم القيامة: "إن أمتي يأتون يوم القيامة غراً محجلين من أثر الوضوء"</li>
        </ul>
      </div>
    </div>`
  },
  { 
    id: 2, 
    title: "الصلاة - أركانها وشروطها", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">مكانة الصلاة في الإسلام</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الصلاة هي الركن الثاني من أركان الإسلام، وأهم الأركان بعد الشهادتين. وهي الصلة الوثيقة بين العبد وربه، تأتي في اليوم والليلة خمس مرات، وبها يتميز المسلم المطيع من العاصي في فترة وجيزة.</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">شروط الصلاة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإسلام:</strong> فلا تصح من الكافر</li>
          <li><strong>العقل:</strong> فلا تجب على المجنون</li>
          <li><strong>التمييز:</strong> فلا تجب على الصغير غير المميز</li>
          <li><strong>الطهارة من الحدث:</strong> بالوضوء أو الغسل</li>
          <li><strong>الطهارة من النجاسة:</strong> في البدن والثوب والمكان</li>
          <li><strong>ستر العورة:</strong> للرجل والمرأة</li>
          <li><strong>دخول الوقت:</strong> لكل صلاة وقتها المحدد</li>
          <li><strong>استقبال القبلة:</strong> جهة الكعبة المشرفة</li>
          <li><strong>النية:</strong> في القلب دون التلفظ بها</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أركان الصلاة الأربعة عشر</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>القيام في الفرض للقادر</li>
          <li>تكبيرة الإحرام (الله أكبر)</li>
          <li>قراءة الفاتحة في كل ركعة</li>
          <li>الركوع مع الطمأنينة</li>
          <li>الرفع من الركوع والاعتدال</li>
          <li>السجود على الأعضاء السبعة مع الطمأنينة</li>
          <li>الرفع من السجود</li>
          <li>الجلسة بين السجدتين مع الطمأنينة</li>
          <li>الطمأنينة في جميع الأركان</li>
          <li>التشهد الأخير</li>
          <li>الجلوس للتشهد الأخير</li>
          <li>الصلاة على النبي ﷺ في التشهد الأخير</li>
          <li>الترتيب بين الأركان</li>
          <li>التسليم (السلام عليكم ورحمة الله)</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">واجبات الصلاة الثمانية</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>جميع التكبيرات غير تكبيرة الإحرام</li>
          <li>قول "سمع الله لمن حمده" للإمام والمنفرد</li>
          <li>قول "ربنا ولك الحمد" للكل</li>
          <li>قول "سبحان ربي العظيم" في الركوع</li>
          <li>قول "سبحان ربي الأعلى" في السجود</li>
          <li>قول "رب اغفر لي" بين السجدتين</li>
          <li>التشهد الأول</li>
          <li>الجلوس للتشهد الأول</li>
        </ul>
      </div>
    </div>`
  },
  { 
    id: 3, 
    title: "الزكاة - أحكامها ومصارفها", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تعريف الزكاة ومكانتها</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الزكاة هي الركن الثالث من أركان الإسلام، وهي عبادة مالية تجب في السنة مرة واحدة عند حولان الحول أو عند خروج الثمار. نفعها متعدٍ حيث ينتفع صاحبها بالأجر والثواب، وينتفع الفقراء والمحتاجون بالمال.</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">شروط وجوب الزكاة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإسلام:</strong> فلا تجب على الكافر ولا تقبل منه</li>
          <li><strong>الحرية:</strong> فلا تجب على العبد</li>
          <li><strong>الملك التام:</strong> أن يكون المال مملوكاً لصاحبه ملكاً تاماً</li>
          <li><strong>النماء:</strong> أن يكون المال قابلاً للنماء والزيادة</li>
          <li><strong>بلوغ النصاب:</strong> أن يبلغ المال حداً معيناً شرعاً</li>
          <li><strong>الحول:</strong> مرور سنة هجرية كاملة (إلا الزروع والثمار)</li>
          <li><strong>الفضل عن الحوائج الأصلية:</strong> كالطعام والشراب والمسكن</li>
          <li><strong>السلامة من الدين:</strong> أن يكون المال خالياً من الديون</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">الأموال التي تجب فيها الزكاة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>النقدان:</strong> الذهب والفضة والعملات الورقية (2.5%)</li>
          <li><strong>عروض التجارة:</strong> كل ما أُعد للبيع والشراء (2.5%)</li>
          <li><strong>الخارج من الأرض:</strong> الزروع والثمار (5% أو 10%)</li>
          <li><strong>بهيمة الأنعام:</strong> الإبل والبقر والغنم (بنسب محددة)</li>
          <li><strong>الركاز:</strong> دفائن الجاهلية (20%)</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">مصارف الزكاة الثمانية</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed mb-2">قال تعالى: ﴿إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ﴾ [التوبة: 60]</p>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الفقراء:</strong> من لا يجد كفايته</li>
          <li><strong>المساكين:</strong> من يجد بعض كفايته لا كلها</li>
          <li><strong>العاملون عليها:</strong> جباة الزكاة</li>
          <li><strong>المؤلفة قلوبهم:</strong> من يُرجى إسلامه أو تثبيت إيمانه</li>
          <li><strong>في الرقاب:</strong> تحرير العبيد والأسرى</li>
          <li><strong>الغارمون:</strong> المدينون العاجزون عن السداد</li>
          <li><strong>في سبيل الله:</strong> المجاهدون في سبيل الله</li>
          <li><strong>ابن السبيل:</strong> المسافر المنقطع عن بلده</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">حكمة مشروعية الزكاة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>تطهير النفس من البخل والشح</li>
          <li>مواساة الفقراء والمحتاجين</li>
          <li>تحقيق التكافل الاجتماعي</li>
          <li>تنمية المال وبركته</li>
          <li>شكر الله على نعمة المال</li>
        </ul>
      </div>
    </div>`
  },
  { 
    id: 4, 
    title: "الصيام - أحكام صوم رمضان", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تعريف الصيام ومكانته</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الصيام هو الركن الرابع من أركان الإسلام، وهو التعبد لله سبحانه وتعالى بالإمساك عن الطعام والشراب والجماع وسائر المفطرات من طلوع الفجر إلى غروب الشمس بنية.</p>
        <p class="text-[#FAFAFAB2] leading-relaxed mt-2">قال تعالى: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ﴾ [البقرة: 183]</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">شروط وجوب الصيام</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإسلام:</strong> فلا يجب على الكافر</li>
          <li><strong>البلوغ:</strong> فلا يجب على الصغير</li>
          <li><strong>العقل:</strong> فلا يجب على المجنون</li>
          <li><strong>القدرة:</strong> الاستطاعة البدنية على الصوم</li>
          <li><strong>الإقامة:</strong> فيُرخص للمسافر الفطر</li>
          <li><strong>الخلو من الموانع:</strong> كالحيض والنفاس للمرأة</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أركان الصيام</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>النية:</strong> بالقلب في كل ليلة من رمضان، قال ﷺ: "من لم يُبيِّت الصيام من الليل فلا صيام له"</li>
          <li><strong>الإمساك:</strong> عن المفطرات من طلوع الفجر الصادق إلى غروب الشمس</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">مفسدات الصيام (المفطرات)</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الأكل والشرب:</strong> عمداً أما الناسي فلا يفطر</li>
          <li><strong>الجماع:</strong> في نهار رمضان عمداً</li>
          <li><strong>إنزال المني:</strong> بشهوة عمداً</li>
          <li><strong>الحيض والنفاس:</strong> للمرأة</li>
          <li><strong>التقيؤ عمداً:</strong> أما من غلبه القيء فلا يفطر</li>
          <li><strong>الحجامة:</strong> عند بعض العلماء</li>
          <li><strong>حقن الدم:</strong> كنقل الدم</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">سنن الصيام ومستحباته</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>تأخير السحور وتعجيل الفطر</li>
          <li>الفطر على رطب أو تمر أو ماء</li>
          <li>الإكثار من الصدقة وقراءة القرآن</li>
          <li>الاجتهاد في العشر الأواخر</li>
          <li>الاعتكاف في المسجد</li>
          <li>الدعاء عند الإفطار</li>
          <li>حفظ اللسان عن اللغو والرفث</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فضائل الصيام</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>قال ﷺ: "من صام رمضان إيماناً واحتساباً غُفر له ما تقدم من ذنبه"</li>
          <li>الصيام جُنة (وقاية) من النار</li>
          <li>للصائم دعوة لا تُرد عند فطره</li>
          <li>خلوف فم الصائم أطيب عند الله من ريح المسك</li>
          <li>في الجنة باب يُقال له الريان لا يدخله إلا الصائمون</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">قضاء الصيام</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">من أفطر لعذر شرعي (مرض، سفر، حيض، نفاس) وجب عليه قضاء الأيام التي أفطرها. قال تعالى: ﴿فَمَنْ كَانَ مِنْكُمْ مَرِيضًا أَوْ عَلَى سَفَرٍ فَعِدَّةٌ مِنْ أَيَّامٍ أُخَرَ﴾ [البقرة: 184]</p>
      </div>
    </div>`
  },
  { 
    id: 5, 
    title: "الحج والعمرة - أركانهما وواجباتهما", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تعريف الحج ومكانته</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الحج هو الركن الخامس من أركان الإسلام، وهو قصد البيت الحرام بمكة المكرمة للتعبد لله سبحانه وتعالى بأداء مناسك مخصوصة في وقت مخصوص.</p>
        <p class="text-[#FAFAFAB2] leading-relaxed mt-2">قال تعالى: ﴿وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا وَمَنْ كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ عَنِ الْعَالَمِينَ﴾ [آل عمران: 97]</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">شروط وجوب الحج</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإسلام:</strong> فلا يجب على الكافر</li>
          <li><strong>العقل:</strong> فلا يجب على المجنون</li>
          <li><strong>البلوغ:</strong> فلا يجب على الصغير</li>
          <li><strong>الحرية:</strong> فلا يجب على العبد</li>
          <li><strong>الاستطاعة:</strong> المالية والبدنية والأمنية</li>
          <li><strong>المحرم للمرأة:</strong> فلا تسافر للحج إلا مع محرم</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أركان الحج الأربعة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإحرام:</strong> نية الدخول في النسك من الميقات</li>
          <li><strong>الوقوف بعرفة:</strong> في يوم التاسع من ذي الحجة، قال ﷺ: "الحج عرفة"</li>
          <li><strong>طواف الإفاضة:</strong> طواف يوم النحر أو ما بعده</li>
          <li><strong>السعي بين الصفا والمروة:</strong> سبعة أشواط</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">واجبات الحج السبعة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإحرام من الميقات:</strong> المكاني المحدد شرعاً</li>
          <li><strong>الوقوف بعرفة حتى الغروب:</strong> لمن وقف نهاراً</li>
          <li><strong>المبيت بمزدلفة:</strong> ليلة النحر</li>
          <li><strong>المبيت بمنى:</strong> ليالي أيام التشريق</li>
          <li><strong>رمي الجمرات:</strong> الصغرى والوسطى والكبرى</li>
          <li><strong>الحلق أو التقصير:</strong> للرجال والنساء</li>
          <li><strong>طواف الوداع:</strong> عند مغادرة مكة</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أركان العمرة الثلاثة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>الإحرام:</strong> من الميقات أو من الحل لأهل مكة</li>
          <li><strong>الطواف:</strong> حول الكعبة سبعة أشواط</li>
          <li><strong>السعي:</strong> بين الصفا والمروة سبعة أشواط</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">محظورات الإحرام</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>إزالة الشعر من الرأس أو البدن</li>
          <li>تقليم الأظافر</li>
          <li>تغطية الرأس للرجل</li>
          <li>لبس المخيط للرجل</li>
          <li>الطيب في البدن أو الثوب</li>
          <li>عقد النكاح</li>
          <li>الجماع ومقدماته</li>
          <li>قتل الصيد البري</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فضائل الحج والعمرة</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>قال ﷺ: "من حج فلم يرفث ولم يفسق رجع كيوم ولدته أمه"</li>
          <li>قال ﷺ: "الحج المبرور ليس له جزاء إلا الجنة"</li>
          <li>قال ﷺ: "العمرة إلى العمرة كفارة لما بينهما"</li>
          <li>الحج والعمرة ينفيان الفقر والذنوب</li>
          <li>الحج من أفضل الأعمال عند الله تعالى</li>
        </ul>
      </div>
    </div>`
  },
  { 
    id: 6, 
    title: "أحكام الجنائز والدفن", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">الواجب عند الموت</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>تلقين المحتضر الشهادة: "لا إله إلا الله"</li>
          <li>إغماض عينيه بعد الموت</li>
          <li>تغطية جسده بثوب</li>
          <li>الإسراع في تجهيزه ودفنه</li>
          <li>قضاء ديونه من تركته</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تغسيل الميت</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">تغسيل الميت فرض كفاية، يُغسل وتراً (ثلاثاً أو خمساً أو أكثر)، ويُبدأ بأعضاء الوضوء ثم يُغسل بقية الجسد، ويُستحب إضافة السدر والكافور في الماء.</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">تكفين الميت</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">يُكفن الرجل في ثلاث لفائف بيضاء، وتُكفن المرأة في خمس قطع: إزار ودرع وخمار ولفافتين.</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">الصلاة على الميت</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed mb-2">صلاة الجنازة فرض كفاية، وصفتها:</p>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>التكبيرة الأولى: يُقرأ الفاتحة</li>
          <li>التكبيرة الثانية: الصلاة على النبي ﷺ</li>
          <li>التكبيرة الثالثة: الدعاء للميت</li>
          <li>التكبيرة الرابعة: ثم التسليم</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">دفن الميت</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>يُدفن في لحد إن أمكن</li>
          <li>يُوضع على جنبه الأيمن مستقبل القبلة</li>
          <li>يُقال: "بسم الله وعلى ملة رسول الله"</li>
          <li>يُهال عليه التراب</li>
          <li>يُرفع القبر قدر شبر</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">التعزية والدعاء للميت</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">يُستحب تعزية أهل الميت والدعاء لهم بالصبر والأجر، والدعاء للميت بالمغفرة والرحمة.</p>
      </div>
    </div>`
  },
  { 
    id: 7, 
    title: "الذكر والدعاء - فضلهما وآدابهما", 
    content: `<div class="space-y-4">
      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فضل الذكر</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">الذكر من أعظم العبادات وأيسرها، قال تعالى: ﴿فَاذْكُرُونِي أَذْكُرْكُمْ﴾ [البقرة: 152]. وقال ﷺ: "مثل الذي يذكر ربه والذي لا يذكر ربه مثل الحي والميت".</p>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أفضل الأذكار</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li><strong>لا إله إلا الله:</strong> أفضل الذكر، قال ﷺ: "أفضل الذكر لا إله إلا الله"</li>
          <li><strong>سبحان الله والحمد لله:</strong> "سبحان الله وبحمده، سبحان الله العظيم"</li>
          <li><strong>الاستغفار:</strong> "أستغفر الله وأتوب إليه"</li>
          <li><strong>الصلاة على النبي ﷺ:</strong> "اللهم صل على محمد وعلى آل محمد"</li>
          <li><strong>الباقيات الصالحات:</strong> "سبحان الله، والحمد لله، ولا إله إلا الله، والله أكبر"</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أذكار الصباح والمساء</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>آية الكرسي</li>
          <li>المعوذات (الإخلاص والفلق والناس) ثلاث مرات</li>
          <li>"أصبحنا وأصبح الملك لله" أو "أمسينا وأمسى الملك لله"</li>
          <li>"اللهم بك أصبحنا وبك أمسينا"</li>
          <li>"أعوذ بكلمات الله التامات من شر ما خلق" ثلاث مرات</li>
          <li>التسبيح والتحميد والتكبير (33 مرة لكل منها)</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">آداب الدعاء</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>إخلاص النية لله تعالى</li>
          <li>البدء بحمد الله والثناء عليه</li>
          <li>الصلاة على النبي ﷺ</li>
          <li>استقبال القبلة ورفع اليدين</li>
          <li>الجزم في الدعاء واليقين بالإجابة</li>
          <li>عدم الاستعجال</li>
          <li>الإلحاح في الدعاء</li>
          <li>اختيار أوقات الإجابة</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">أوقات إجابة الدعاء</h4>
        <ul class="list-disc mr-5 text-[#FAFAFAB2] space-y-2">
          <li>الثلث الأخير من الليل</li>
          <li>عند السجود في الصلاة</li>
          <li>بين الأذان والإقامة</li>
          <li>في يوم الجمعة (ساعة الإجابة)</li>
          <li>عند نزول المطر</li>
          <li>عند شرب ماء زمزم</li>
          <li>في السفر</li>
          <li>عند الإفطار للصائم</li>
        </ul>
      </div>

      <div>
        <h4 class="text-[#E7D7A0] font-semibold mb-2">فضل الدعاء</h4>
        <p class="text-[#FAFAFAB2] leading-relaxed">قال تعالى: ﴿وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ﴾ [غافر: 60]. وقال ﷺ: "الدعاء هو العبادة". وقال ﷺ: "ما من عبد يدعو بدعوة ليس فيها إثم ولا قطيعة رحم إلا أعطاه الله بها إحدى ثلاث: إما أن يعجل له دعوته، وإما أن يدخرها له في الآخرة، وإما أن يصرف عنه من السوء مثلها".</p>
      </div>
    </div>`
  }
]

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00"
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, "0")}`
}

function LessonsPlayer() {
  const [activeLesson, setActiveLesson] = useState<LessonType>(lessonsList[3])
  const [tafsirData, setTafsirData] = useState<TafsirSora[]>([])
  const [selectedTafsir, setSelectedTafsir] = useState<TafsirSora | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [lectures, setLectures] = useState<ApiLecture[]>([])
  const [selectedLecture, setSelectedLecture] = useState<ApiLecture | null>(null)
  const [expandedLecture, setExpandedLecture] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [muted, setMuted] = useState(false)
  const [loop, setLoop] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [openFiqhId, setOpenFiqhId] = useState<number | null>(null)

  useEffect(() => {
    if (activeLesson.id === 3) {
      setLoading(true)
      fetch('https://www.mp3quran.net/api/v3/tafsir')
        .then(res => res.json())
        .then(data => {
          setTafsirData(data.tafasir.soar)
          const firstTafsir = data.tafasir.soar[0]
          setSelectedTafsir(firstTafsir)
          const audio = new Audio(firstTafsir.url)
          audioRef.current = audio
          setLoading(false)
        })
        .catch(err => {
          console.error('Error fetching tafsir:', err)
          setLoading(false)
        })
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      setIsPlaying(false)
    }
  }, [activeLesson.id])

  useEffect(() => {
    if (activeLesson.id === 1 || activeLesson.id === 2 || activeLesson.id === 4) {
      setLoading(true)
      const mockData: { [key: number]: ApiLecture[] } = {
        1: [
          { id: 1, title: "فضل الصلاة على النبي ﷺ", description: "درس قصير عن أهمية وفضل الصلاة على النبي محمد صلى الله عليه وسلم", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/001.mp3", size: 2500000 }] },
          { id: 2, title: "أذكار الصباح والمساء", description: "شرح مختصر لأهم الأذكار اليومية وفضلها", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/002.mp3", size: 3200000 }] },
          { id: 3, title: "آداب الدعاء", description: "كيف ندعو الله تعالى وما هي آداب الدعاء المستحبة", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/003.mp3", size: 2800000 }] },
          { id: 4, title: "فضل الاستغفار", description: "أهمية الاستغفار في حياة المسلم وأوقاته المستحبة", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/010.mp3", size: 2100000 }] },
          { id: 5, title: "آداب المسجد", description: "السنن والآداب المتعلقة بدخول المسجد والخروج منه", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/011.mp3", size: 1900000 }] }
        ],
        2: [
          { id: 101, title: "مولد النبي ﷺ ونشأته", description: "قصة ميلاد الرسول الكريم في مكة المكرمة وطفولته", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/004.mp3", size: 4500000 }] },
          { id: 102, title: "بعثة النبي ﷺ", description: "بداية الوحي ونزول جبريل عليه السلام على النبي", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/005.mp3", size: 5200000 }] },
          { id: 103, title: "الهجرة إلى المدينة", description: "رحلة الهجرة المباركة من مكة إلى المدينة المنورة", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/006.mp3", size: 6100000 }] },
          { id: 104, title: "غزوة بدر الكبرى", description: "أول معركة فاصلة بين الحق والباطل يوم الفرقان", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/012.mp3", size: 5800000 }] },
          { id: 105, title: "فتح مكة المكرمة", description: "الفتح الأعظم ودخول النبي ﷺ مكة منتصراً", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/013.mp3", size: 6500000 }] },
          { id: 106, title: "حجة الوداع", description: "آخر حج للنبي ﷺ وخطبته الشهيرة", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/014.mp3", size: 5400000 }] }
        ],
        4: [
          { id: 201, title: "التوكل على الله", description: "محاضرة عن معنى التوكل الحقيقي وكيف نطبقه في حياتنا اليومية", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/007.mp3", size: 8500000 }] },
          { id: 202, title: "الصبر على البلاء", description: "كيف نصبر على الابتلاءات ونحتسب الأجر عند الله تعالى", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/008.mp3", size: 7800000 }] },
          { id: 203, title: "فضل ذكر الله", description: "أهمية الذكر في حياة المسلم وأثره على القلب والروح", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/009.mp3", size: 6900000 }] },
          { id: 204, title: "حسن الظن بالله", description: "معنى حسن الظن بالله وكيف يكون المؤمن دائماً في معية الله", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/015.mp3", size: 7200000 }] },
          { id: 205, title: "بر الوالدين", description: "فضل بر الوالدين ومكانته في الإسلام وجزاء البار", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/016.mp3", size: 6700000 }] },
          { id: 206, title: "صلة الرحم", description: "أهمية صلة الرحم وثمراتها في الدنيا والآخرة", attachments: [{ url: "https://server13.mp3quran.net/husr/Rewayat-Warsh-A-n-Nafi/017.mp3", size: 6200000 }] }
        ]
      }

      setTimeout(() => {
        const data = mockData[activeLesson.id] || []
        setLectures(data)
        if (data.length > 0) { setSelectedLecture(data[0]) }
        setLoading(false)
      }, 500)
    }
  }, [activeLesson.id])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handleLoaded = () => setDuration(audio.duration)
    const handleTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => { if (loop) { audio.currentTime = 0; audio.play() } else { handleNext() } }
    audio.addEventListener("loadedmetadata", handleLoaded)
    audio.addEventListener("timeupdate", handleTime)
    audio.addEventListener("ended", handleEnded)
    return () => {
      audio.removeEventListener("loadedmetadata", handleLoaded)
      audio.removeEventListener("timeupdate", handleTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [selectedTafsir, selectedLecture, loop])

  const handleSelectLesson = (lesson: LessonType) => {
    setActiveLesson(lesson)
    setIsPlaying(false)
    setSearchTerm("")
    setOpenFiqhId(null)
    setExpandedLecture(null)
  }

  const loadAndPlayTafsir = async (tafsir: TafsirSora) => {
    let audio = audioRef.current
    if (!audio) { audio = new Audio(tafsir.url); audioRef.current = audio } 
    else if (audio.src !== tafsir.url) { audio.pause(); audio.currentTime = 0; audio.src = tafsir.url }
    audio.volume = muted ? 0 : 1
    try { await audio.play(); setIsPlaying(true); setSelectedTafsir(tafsir) } 
    catch { setIsPlaying(false) }
  }

  const loadAndPlayLecture = async (lecture: ApiLecture) => {
    if (!lecture.attachments || lecture.attachments.length === 0) return
    const audioUrl = lecture.attachments[0].url
    let audio = audioRef.current
    if (!audio) { audio = new Audio(audioUrl); audioRef.current = audio } 
    else if (audio.src !== audioUrl) { audio.pause(); audio.currentTime = 0; audio.src = audioUrl }
    audio.volume = muted ? 0 : 1
    try { await audio.play(); setIsPlaying(true); setSelectedLecture(lecture) } 
    catch { setIsPlaying(false) }
  }

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) {
      if (selectedTafsir) { await loadAndPlayTafsir(selectedTafsir) } 
      else if (selectedLecture) { await loadAndPlayLecture(selectedLecture) }
      return
    }
    if (isPlaying) { audio.pause(); setIsPlaying(false) } 
    else { try { await audio.play(); setIsPlaying(true) } catch { setIsPlaying(false) } }
  }

  const handleNext = () => {
    if (activeLesson.id === 3 && selectedTafsir && tafsirData.length > 0) {
      const idx = tafsirData.findIndex((t) => t.id === selectedTafsir.id)
      const next = tafsirData[(idx + 1) % tafsirData.length]
      loadAndPlayTafsir(next)
    } else if ((activeLesson.id === 1 || activeLesson.id === 2 || activeLesson.id === 4) && selectedLecture && lectures.length > 0) {
      const idx = lectures.findIndex((l) => l.id === selectedLecture.id)
      const next = lectures[(idx + 1) % lectures.length]
      loadAndPlayLecture(next)
    }
  }

  const handlePrev = () => {
    if (activeLesson.id === 3 && selectedTafsir && tafsirData.length > 0) {
      const idx = tafsirData.findIndex((t) => t.id === selectedTafsir.id)
      const prev = tafsirData[(idx - 1 + tafsirData.length) % tafsirData.length]
      loadAndPlayTafsir(prev)
    } else if ((activeLesson.id === 1 || activeLesson.id === 2 || activeLesson.id === 4) && selectedLecture && lectures.length > 0) {
      const idx = lectures.findIndex((l) => l.id === selectedLecture.id)
      const prev = lectures[(idx - 1 + lectures.length) % lectures.length]
      loadAndPlayLecture(prev)
    }
  }

  const toggleMute = () => {
    const audio = audioRef.current
    if (!audio) return
    const newMuted = !muted
    setMuted(newMuted)
    audio.volume = newMuted ? 0 : 1
  }

  const toggleLoop = () => {
    const audio = audioRef.current
    if (!audio) return
    setLoop((prev) => !prev)
    audio.currentTime = 0
    audio.play()
    setIsPlaying(true)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio || duration === 0) return
    const value = Number(e.target.value)
    audio.currentTime = (value / 100) * duration
    setCurrentTime(audio.currentTime)
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0
  const isTafsirMode = activeLesson.id === 3
  const isFiqhMode = activeLesson.id === 5
  const isLectureMode = activeLesson.id === 1 || activeLesson.id === 2 || activeLesson.id === 4

  const filteredTafsir = useMemo(() => tafsirData.filter((tafsir) => tafsir.name.toLowerCase().includes(searchTerm.toLowerCase())), [tafsirData, searchTerm])
  const filteredLectures = useMemo(() => lectures.filter((lecture) => lecture.title.toLowerCase().includes(searchTerm.toLowerCase())), [lectures, searchTerm])

  const toggleFiqh = (id: number) => { setOpenFiqhId(openFiqhId === id ? null : id) }
  const toggleLectureExpand = (id: number) => { setExpandedLecture(expandedLecture === id ? null : id) }

  if (loading) {
    return (
      <div className="mt-[100px] text-center py-20" dir="rtl">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#E7D7A0]"></div>
        <p className="text-[#FFFEEE] text-xl mt-4">جاري تحميل المحتوى الإسلامي...</p>
      </div>
    )
  }

  return (
    <div className="mt-[100px]" dir="rtl">
      <div className="flex flex-col items-center md:items-start md:flex-row gap-4 mb-[100px]">
        
        <div className="p-4 w-full md:w-[405px] lg:h-[410px] bg-[#092147] rounded-[20px]">
          <h2 className="text-[24px] text-[#FFFEEE] font-bold mb-6">أقسام الدروس</h2>
          <div className="space-y-3 text-[15px] text-[#E1E4F0]">
            {lessonsList.map((lesson) => {
              const isActive = lesson.id === activeLesson.id
              return (
                <button key={lesson.id} onClick={() => handleSelectLesson(lesson)}
                  className={`w-full flex items-center justify-between cursor-pointer rounded-[16px] py-3.5 px-4 transition-all
                    ${isActive ? "border-[0.5px] border-[#E7D7A0] bg-[linear-gradient(90deg,rgba(231,215,160,0.25)_0%,rgba(16,24,53,0.25)_86.06%)]" : "bg-transparent hover:bg-[#FFFFFF0D] border border-transparent"}`}>
                  <div className="flex items-center gap-3">
                    <Image src={lesson.img} alt="play" width={24} height={24} />
                    <span className="text-[15px]">{lesson.name}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-8 w-full md:w-[843px] bg-[#092147] rounded-[20px] flex flex-col justify-between relative overflow-hidden">
          {!isFiqhMode && (
            <>
              {isTafsirMode && (
                <div className="relative w-full mb-4">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Image src="/search-02.webp" alt="search" width={20} height={20} />
                  </div>
                  <input type="text" placeholder="ابحث عن سورة..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0A102A] text-[#FAFAFAB2] text-[12px] font-normal rounded-[12px] border-[0.5px] border-[#B7B7B7B2] py-3 pr-11 pl-4 focus:outline-none focus:border-[#E7D7A0] transition-colors placeholder-[#FAFAFAB2]" />
                </div>
              )}

              {isLectureMode && (
                <div className="relative w-full mb-4">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                    <Image src="/search-02.webp" alt="search" width={20} height={20} />
                  </div>
                  <input type="text" placeholder="ابحث في المحاضرات..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#0A102A] text-[#FAFAFAB2] text-[12px] font-normal rounded-[12px] border-[0.5px] border-[#B7B7B7B2] py-3 pr-11 pl-4 focus:outline-none focus:border-[#E7D7A0] transition-colors placeholder-[#FAFAFAB2]" />
                </div>
              )}

              {isTafsirMode && (
                <div className="max-h-[120px] overflow-y-auto mb-6 space-y-2 scrollbar-thin">
                  {filteredTafsir.length === 0 ? (
                    <p className="text-[#FFFEEE] text-center text-[14px]">لا توجد نتائج</p>
                  ) : (
                    filteredTafsir.map((tafsir) => (
                      <label key={tafsir.id} onClick={() => loadAndPlayTafsir(tafsir)}
                        className={`flex items-center gap-3 p-2 rounded-[12px] cursor-pointer transition-all ${selectedTafsir?.id === tafsir.id ? "bg-[#E7D7A01A] border border-[#E7D7A0]" : "bg-[#101B38] hover:bg-[#1a2b5a]"}`}>
                        <input type="radio" name="tafsir" checked={selectedTafsir?.id === tafsir.id} onChange={() => {}} className="w-3 h-3 accent-[#E7D7A0]" />
                        <span className="text-[13px] text-[#FFFEEE]">{tafsir.name}</span>
                      </label>
                    ))
                  )}
                </div>
              )}

              {isLectureMode && (
                <div className="max-h-[120px] overflow-y-auto mb-6 space-y-3 scrollbar-thin">
                  {filteredLectures.length === 0 ? (
                    <p className="text-[#FFFEEE] text-center text-[14px]">لا توجد نتائج</p>
                  ) : (
                    filteredLectures.map((lecture) => {
                      const isExpanded = expandedLecture === lecture.id
                      const hasAudio = lecture.attachments && lecture.attachments.length > 0
                      return (
                        <div key={lecture.id}
                          className={`border border-[#E7D7A066] rounded-[16px] overflow-hidden bg-[#0A102A] transition-all hover:border-[#E7D7A0] ${selectedLecture?.id === lecture.id ? "border-[#E7D7A0] bg-[#E7D7A01A]" : ""}`}>
                          <div className="flex items-center justify-between px-5 py-4">
                            <div className="flex-1">
                              <h3 className="text-[#FFFEEE] font-semibold text-[15px] mb-1">{lecture.title}</h3>
                              {lecture.description && <p className="text-[#FAFAFAB2] text-[13px] line-clamp-2">{lecture.description}</p>}
                            </div>
                            <div className="flex items-center gap-3 mr-4">
                              {hasAudio && (
                                <button onClick={() => loadAndPlayLecture(lecture)}
                                  className="w-10 h-10 cursor-pointer flex items-center justify-center border border-[#E7D7A0] rounded-full hover:bg-[#E7D7A01A] transition-colors">
                                  <Image src="/play.webp" alt="play" width={16} height={16} />
                                </button>
                              )}
                              <button onClick={() => toggleLectureExpand(lecture.id)} className="w-6 h-6 flex items-center justify-center">
                                <Image src="/arrowtop.webp" alt="toggle" width={20} height={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                              </button>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="px-5 pb-4 text-[#FAFAFAB2] text-[14px] leading-relaxed border-t border-[#E7D7A033]">
                              {lecture.description}
                            </div>
                          )}
                        </div>
                      )
                    })
                  )}
                </div>
              )}

              <div className="flex gap-6 items-start">
                <div className="relative w-[180px] h-[180px] rounded-[20px] overflow-hidden border-2 border-[#E7D7A0]">
                  <Image src="/quran-cover.webp" alt="cover" fill className="object-cover" />
                </div>
                <div className="text-right mt-5">
                  <p className="text-[#FBF9EF] text-[12px] font-normal mb-2">يتم الآن الاستماع إلى</p>
                  <h1 className="text-[#FFFEEE] text-[32px] font-bold mb-1">
                    {isTafsirMode && selectedTafsir ? selectedTafsir.name : isLectureMode && selectedLecture ? selectedLecture.title : isTafsirMode ? "تفسير القرآن الكريم" : "شروح كتب السُّنَّة"}
                  </h1>
                  <p className="text-[#E7D7A0] text-[18px] font-normal">{activeLesson.reader}</p>
                </div>
              </div>

              <div className="w-full mt-auto">
                <div className="flex justify-between text-[12px] text-[#FAFAFAB2] mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <div className="relative w-full cursor-pointer">
                  <input type="range" min={0} max={100} value={progressPercent} onChange={handleSeek}
                    className="quran-range w-full cursor-pointer"
                    style={{ ["--progress" as any]: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-8 mt-6">
                  <button onClick={toggleMute} className="opacity-60 hover:opacity-100 cursor-pointer transition-opacity">
                    <Image src={muted ? "/mute.webp" : "/volume-high.webp"} alt="volume" width={24} height={24} />
                  </button>


                
                  <button onClick={handleNext} className="hover:scale-110 cursor-pointer transition-transform">
                    <Image src="/next.webp" alt="next" width={32} height={32} />
                  </button>
                  
                  <button onClick={togglePlay}
                    className="w-[64px] h-[64px] cursor-pointer flex items-center justify-center border-2 border-[#E7D7A0] rounded-full hover:bg-[#E7D7A01A] transition-colors">
                    <Image src={isPlaying ? "/pause.webp" : "/play.webp"} alt="status" width={24} height={24} />
                  </button>

                  <button onClick={handlePrev} className="hover:scale-110 cursor-pointer transition-transform">
                    <Image src="/previous.webp" alt="prev" width={32} height={32} />
                  </button>

                  <button onClick={toggleLoop}
                    className={`transition-opacity ${loop ? "opacity-100" : "opacity-60 hover:opacity-100"}`}>
                    <Image src="/repeat.webp" alt="repeat" width={24} height={24} />
                  </button>
                </div>
              </div>
            </>
          )}

          {isFiqhMode && (
            <div className="flex-1 overflow-y-auto max-h-[500px] scrollbar-thin">
              <h1 className="text-[30px] lg:text-[32px] text-[#FFFEEE] font-bold mb-6 text-right">فقه العبادات</h1>
              <div className="space-y-3">
                {fiqhLessons.map((lesson) => (
                  <div key={lesson.id} className="border border-[#E7D7A066] rounded-[16px] overflow-hidden bg-[#0A102A] transition-all hover:border-[#E7D7A0]">
                    <button className="w-full flex items-center justify-between px-5 py-4 bg-gradient-to-r from-[#101B38] to-[#0A102A] text-[#FFFEEE] font-semibold text-[16px] hover:from-[#1a2b5a] hover:to-[#101B38] transition-all"
                      onClick={() => toggleFiqh(lesson.id)} aria-expanded={openFiqhId === lesson.id}>
                      <span>{lesson.title}</span>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <Image src="/arrowtop.webp" alt="toggle" width={20} height={20} className={`transition-transform duration-300 ${openFiqhId === lesson.id ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {openFiqhId === lesson.id && (
                      <div className="px-5 py-4 bg-[#0A102A] text-[#FAFAFAB2] text-[14px] leading-relaxed border-t border-[#E7D7A033]" dangerouslySetInnerHTML={{ __html: lesson.content }} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <BestreadersSlider />

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #101B38; border-radius: 10px; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #E7D7A0; border-radius: 10px; }
      `}</style>
    </div>
  )
}

export default LessonsPlayer
