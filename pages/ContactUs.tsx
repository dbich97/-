import React from 'react';

const ContactUs: React.FC = () => {
    return (
        <div className="bg-white/60 backdrop-blur-2xl border border-white/30 rounded-[2rem] shadow-2xl p-6 sm:p-10 w-full max-w-4xl text-right animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 mb-8 text-center">
                اتصل بنا
            </h1>

            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                <p>
                    نحن في موقع "حاسبة العمر" نرحب دائماً بآرائكم واستفساراتكم. إن تواصلكم معنا هو جزء أساسي من تطوير خدماتنا وتحسينها لتلبية توقعاتكم. سواء كان لديكم سؤال، أو اقتراح، أو واجهتكم مشكلة فنية، فإننا هنا للاستماع والمساعدة.
                </p>

                <h2 className="text-2xl font-bold mt-8">كيف يمكننا مساعدتك؟</h2>
                <p>
                    يمكنك التواصل معنا بخصوص أي من الأمور التالية. نحن نقدر كل رسالة تصلنا ونتعامل معها بجدية واهتمام:
                </p>
                <ul className="list-disc pr-6">
                    <li>
                        <strong>استفسارات عامة:</strong> إذا كان لديك أي سؤال حول كيفية عمل <strong>موقعنا</strong> أو أي من ميزاته.
                    </li>
                    <li>
                        <strong>اقتراحات للتحسين:</strong> هل لديك فكرة رائعة لميزة جديدة؟ أو اقتراح لتحسين تجربة المستخدم؟ نحن متشوقون لسماعها.
                    </li>
                    <li>
                        <strong>الإبلاغ عن مشكلة فنية:</strong> في حال واجهت أي خطأ أو مشكلة أثناء استخدام <strong>خدماتنا</strong>، يرجى إبلاغنا بالتفاصيل لنتمكن من إصلاحها في أسرع وقت.
                    </li>
                    <li>
                        <strong>استفسارات إعلانية وشراكات:</strong> للفرص التجارية أو الاستفسارات المتعلقة بالإعلان على الموقع.
                    </li>
                </ul>

                <h2 className="text-2xl font-bold mt-8">قناة الاتصال الرسمية</h2>
                <p>
                    الطريقة الأفضل والأسرع للتواصل مع فريقنا هي عبر البريد الإلكتروني. يضمن ذلك وصول رسالتكم إلى الشخص المسؤول مباشرة وتلقيكم رداً منظماً ومفصلاً.
                </p>
                <div className="text-center my-6">
                    <a href="mailto:contact@VilaMe.com" className="inline-block bg-indigo-600 text-white font-bold text-xl py-3 px-8 rounded-lg hover:bg-indigo-700 transition-colors duration-300">
                        contact@VilaMe.com
                    </a>
                </div>
                <p>
                    نحن نسعى جاهدين للرد على جميع الرسائل الواردة في غضون 24-48 ساعة عمل. نشكر لكم تفهمكم وصبركم.
                </p>

                <h2 className="text-2xl font-bold mt-8">قبل أن تتواصل معنا</h2>
                <p>
                    لتوفير وقتك والحصول على إجابة أسرع، قد تجد ما تبحث عنه في صفحاتنا الأخرى. نوصي بالاطلاع على:
                </p>
                <ul className="list-disc pr-6">
                    <li><strong>صفحة الأسئلة الشائعة:</strong> قمنا بتضمين قسم للأسئلة الشائعة في الصفحة الرئيسية، والذي يجيب على معظم استفسارات المستخدمين المتكررة.</li>
                    <li><strong>الصفحات القانونية:</strong> إذا كان استفسارك يتعلق بالخصوصية أو شروط الاستخدام، فيرجى مراجعة صفحة "سياسة الخصوصية" و "اتفاقية الاستخدام".</li>
                </ul>

                <h2 className="text-2xl font-bold mt-8">التزامنا تجاهكم</h2>
                <p>
                    إن كل <strong>مستخدم</strong> هو شريك لنا في النجاح. نحن نؤمن بأن التواصل المفتوح والشفاف هو أساس بناء علاقة قوية ومستدامة. ملاحظاتكم هي الوقود الذي يدفعنا للابتكار والتطوير المستمر. نشكركم على كونكم جزءاً من مجتمع "حاسبة العمر"، ونتطلع دائماً لسماع آرائكم.
                </p>
            </div>
        </div>
    );
};

export default ContactUs;