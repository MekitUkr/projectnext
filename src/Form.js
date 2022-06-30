//Formik - библиотека для работ с формами любой сложности, с помощью нее довольно удобно можно создавать, делать валидацию форм(также для валидации можно использовать сторонние библиотеки, например Yup)
//Yup напрямую не связан с Formik  потому мы его можем его использовать где угодно

//Yup - библиотека для валидации форм, мы сами тоже описать валидацию формы(вякие проверки в input'ах и тд) но Yup имеет уже строенные функции для этого 
//поэтому если у нас есть однотипные несложные задачи для проверки, то мы можем подключить Yup который сам будет заниматься этими проверками

//Варинт с хуком useFOrmik
// import { useFormik } from "formik";
// import * as Yup from 'yup';//такой синтаксис означает что мы импортируем все что есть в библиотеке Yup

//Реализация функции validate(собственная реализация)
// const validate=values=>{//функция для валидации(проверки введенных значений) формы которая будет в себя принимать обьект с данными формы
//     const errors={};
//     if(!values.name){
//         errors.name='Обязательное поле';
//     }else if(values.name.length<2){
//         errors.name= 'Минимум 2 символа для заполения'
//     }else if(values.name.length >20){
//         errors.name='Максимально допустимая длина даной строки - 20 символов'
//     }

//     if(!values.email){
//         errors.email='Обязательное поле';
//     }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i.test(values.email)){
//         errors.email='Неправильный email адресс';
//     }

//     return errors;//когда наша функция валидации закончила все проверки она вернет обьект с ошибками
// }


// const Form = () => {
//     const formik = useFormik({//в хук useFormik помещаем обьект с настройками
//         initialValues: {//в свойство-обьект initialValues мы должны перечеслить те input которые мы будем контролировать внутри нашей формы
//                         //inputы перечиляются по их аттрибуту name, мы должны обязательно его указать в любом input чтобы иметь доступ к этому input
//             name:'',
//             email:'',
//             amount: 0,
//             currency: '',
//             text:'',
//             terms:false
//         }//все свойства этого обьекта значение аттрибутов name всех input которые есть у нас в форме - тобишь мы устанавливаем для input'ов с такими именами их стартовые значения(к примеру input с аттрибутом name="name" будет иметь старотовое значение - '' (это значение будет такде записываться в аттрибут value этого input))
//         //это обьект с базовыми значениями которые мы будем использловать дальше в форме
//         ,
//         onSubmit:(values)=>{//вторым обязательным свойством обьекта который мы помещаем в хук useFormik - это onSubmit _ функция которая будем вызываться при отправке формы
//                         //эта функция принимает в себя обьект values - обьект со значениями из нашей формы(тобишь обьект который мы указали в initialValues только значение свойств этого обьекта будут уже установлены пользователем после взаимодействия с формой, а не по умолчанию )
            
//             console.log(JSON.stringify(values, null,2));//такая конструкция используется для того чтобы превратить наш обьект в строку, иначе в консоли мы получим Object object
//         },
//         //Тут мы добавляли собственную функцию валидации
//         //validate:validate//3й обязательный аргумент - функция валидации(проверки значений формы)
//         //эта функция валидации будет срабатывать каждый раз когда у нас срабатывают свтроенные в fromik обработчики события например handleChange
        
//         //А сейчас добавим встроенный функционал с  библиотеки Yup
//         validationSchema:Yup.object({//Эта команда говорит что мы вернем обьект с какими-то ключами(по факту это то что возвращала наша собственная функция валидации, тобишь обьект errors)
//             name: Yup.string()//говорим что у input у которого значение аттрибута name = name, данные которые ввел пользователь(тобишь данные которые позже запишутся в аттрибут value этого input) должныбыть строкой
//                     .min(2,'Минимум 2 символа')//метод min применяется к строке и говорит что если у нас длинна строки (первый аргумент метода min) меньше значения которое мы передали В метод min
//                     // то выведется такое сообщение которые мы написали во втором аргументе при вызове метода min
//                     .required('Обязательное поле'),//метод required говорит что у input  с таким именем должен быть заполнен, иначе выведется то сообщение которые мы передали в метод required при его вызове
           
//             email: Yup.string()
//                         .email('Неправильный email адресс')//этот метод говорит что строка должны быть email-ом (это очень удобный встроенный в Yup метод) иначе выведется то сообщение которые мы передали в этот метод при его вызове
//                         .required('Обязательное поле'),
//             amount:Yup.number()
//                         .min(5,'Не менее 5')
//                         .required('Обязательное поле'),
//             currency: Yup.string().required('Выберите валюту'),
//             text:Yup.string()
//                         .min(10,'Не менне 10 символов'),
//             terms: Yup.boolean().required('Необходимо согласие')
//                             .oneOf([true], 'Неоходимо согласие')//при помощи метода oneOf мы создаем список значений которые будут проходит валидацию(в нашем случае checkBox может принимать одно из 2 значений - true либо false)
//                                                                 //и нам необходимо скзаать что если у нас стоит true то мы будем пропускать проверку если false то будем выдавать ошибку
//                                                                 //первый аргумент - массив значений(мы говорим что checkBox должен принимать значение true)     2й аргумент - сообщение которое выведется если значение checkBox не прошло проверку
//             })//Yup object также вернент обьект который в Formik будет назван как errors и мы его можем использовать как и тот обьект errors который возвращала наша собственная функция валидации
//     })
//     return (
//         <form className="form" onSubmit={formik.handleSubmit/*handleSubmit - это функция onSunbmit которую мы поместили в formik(просто библиотека Formik автоматически ее переименовует в handleSubmit) */}>
//             <h2>Отправить пожертвование</h2>
//             <label htmlFor="name">Ваше имя</label>
//             <input
//                 id="name"
//                 name="name"
//                 type="text"
//                 value={formik.values.name /*опять таки наше своство- обьект initialValues который мы поместили в обьект, который мы передали в хук useFormik при его вызове, библиотека Formik сама переименовала его values */}
//                 onChange={formik.handleChange/*также  библиотека Formik определяет сама нескольько  функций которые обрабатывают какое-то событие
//                 к примеру событие onChnage обрабатывает встроенная функция в Formik - handleChange 
//                 Функция handleChange смотрит какой input у нас изменяется, смотрит на аттрибут name этого input, если значение аттрибута name этого input есть в обьекте values(обьект со значениями формы(такой же обьект как и обьект initialValues только значения свойств этого обьекта те которые поставил пользователь))
//                 тобишь в обьекте values есть своство чье название равно значению аттрибута name то она меняет значение этого свойства в обьекте values на то что пользователь ввел в этот input 
//                 также срабатывает и обратная связь когда значение в обькте values поменялось на то что ввел пользователь то в аттрибут value этого input'a записыватся новое значение */}
                
//                 onBlur={formik.handleBlur}//событие onBlur срабатывает когда мы уводим фокус с нашего элемента(конкретно тут с нашего input)
//                 //тобишь когда мы кликаем по input срабатывает событие onFocus, а когда мы уводим фокус с нешго элемента(к примеру кликаем в любую олбасть экрана чтобы перестать взаимодействовать с input срабатывает собтыие onBlur)
//             />
//             {formik.errors.name && formik.touched.name ? <div className="error">{formik.errors.name}</div>: null/*Обращаемся к обьекту errors который встроен в formik (это тот обьект который вернула наша функция валидциции validate(напомниаем что она срабатывает каждый раз когда вызываются встроенные в Formik функции-обработчики событий)) 
//             и спращиваем есть ли в обьекте errors поле name и если есть то рендерим div который сообщает нам об ошибке, если  же такого поля нет то мы ничего не рендерим */}
//             <label htmlFor="email">Ваша почта</label>
//             <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 onChange={formik.handleChange}
//                 value={formik.values.email}
//                 onBlur={formik.handleBlur}//Что нам дает onBLur - когда пользователь провзаимодействовал с каким-то input, убрал с него фокус(сработало событие onBlur), 
//                 //то значение аттрибута name этого input было записано в специальный встроенный в Formik обьект touched
//                 //тобишь в обьект touched попадают значение аттрибута name тех input'ов с которыми пользователь уже взаимодействовал
//             />
//             {formik.errors.email && formik.touched.email ? <div className="error">{formik.errors.email}</div>: null}
//             <label htmlFor="amount">Количество</label>
//             <input
//                 id="amount"
//                 name="amount"
//                 type="number"
//                 {...formik.getFieldProps('amount')}
//             />
//             {formik.errors.amount && formik.touched.amount ? <div className="error">{formik.errors.amount}</div>: null}
//             <label htmlFor="currency">Валюта</label>
//             <select
//                 id="currency"
//                 name="currency"
//                 onChange={formik.handleChange}
//                 value={formik.values.currency}
//                 onBlur={formik.handleBlur}>
//                     <option value="">Выберите валюту</option>
//                     <option value="USD">USD</option>
//                     <option value="UAH">UAH</option>
//                     <option value="RUB">RUB</option>
//             </select>
//             {formik.errors.currency && formik.touched.currency ? <div className="error">{formik.errors.currency}</div>: null}
//             <label htmlFor="text">Ваше сообщение</label>
//             <textarea 
//                 id="text"
//                 name="text"
//                 onChange={formik.handleChange}
//                 value={formik.values.text}
//                 onBlur={formik.handleBlur}
//             />
//             {formik.errors.text && formik.touched.text ? <div className="error">{formik.errors.text}</div>: null}
//             <label className="checkbox">
//                 <input name="terms" 
//                 type="checkbox"
//                 onChange={formik.handleChange}
//                 value={formik.values.terms}
//                 onBlur={formik.handleBlur} />
//                 Соглашаетесь с политикой конфиденциальности?
//             </label>
//             {formik.errors.terms && formik.touched.terms ? <div className="error">{formik.errors.terms}</div>: null}
//             <button type="submit">Отправить</button>
//         </form>
//     )
// }

//Вариант с копмпонентом
import{Formik, Form, Field, ErrorMessage, useField} from 'formik'
import * as Yup from 'yup';

//хук useField через контекст будет получать все необходимые пропсы(такие как onBlur onHandleChange value) когда он используется внутри Formik
const MyTextInput=({label, ...props})=>{
    const [field,meta]=useField(props);//useField возвращает массив из 2х обьектов 1й элемент массива - это пропсы(тобишь события onBlur onChange value) 2) элемент это обьект - который вмещает в себя метаданные с ошибками и данные о том был ли уже использован этот input
    return (
        <>
           <label htmlFor={props.name}>{label}</label> 
           <input {...props} {...field}></input>
           {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>) : null }
        </>
    )
}

const MyCheckBox=({children, ...props})=>{
    const [field,meta]=useField({...props, type:'checkbox'});
    return (
        <>
           <label className='checkbox'>
           <input type="checkbox"{...props} {...field}></input>
           {children}
            </label> 
           
           {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>) : null }
        </>
    )
}

const CustomForm = () => {
    
    return (
        <Formik
        initialValues= {{//все те свойства обьекта который получал хук useFormik при вызове кмпонент Formik получает в виде пропсов
            name:'',
            email:'',
            amount: 0,
            currency: '',
            text:'',
            terms:false
        }}
        onSubmit={(values)=>{
            console.log(JSON.stringify(values, null,2));
        }}
        validationSchema={Yup.object({
            name: Yup.string()
                    .min(2,'Минимум 2 символа')
                    .required('Обязательное поле'),
            email: Yup.string()
                        .email('Неправильный email адресс')
                        .required('Обязательное поле'),
            amount:Yup.number()
                        .min(5,'Не менее 5')
                        .required('Обязательное поле'),
            currency: Yup.string().required('Выберите валюту'),
            text:Yup.string()
                        .min(10,'Не менне 10 символов'),
            terms: Yup.boolean().required('Необходимо согласие')
                            .oneOf([true], 'Неоходимо согласие')
            })}
        >{/*если мы работаем с Formik не через хук useFormik то мы должны нашу форму обернуть в компонент Formik */}
            <Form className="form" /*событие onSubmit мы убрали т.к. функция которая будет обрабатывать это событие автоматически подставляется Formikом в этот компонент */>
                <h2>Отправить пожертвование</h2>
                <MyTextInput
                label="Ваше имя"
                    id="name"
                    name="name"
                    type="text"
                   />
                   {/* <ErrorMessage className='error' name='name'>{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>это функция которая будет принимать сообщение об ошибке которое которая связано с именем которое мы указали в пропе name компонента ErrorMessage и рендерить какую-то верстку */}
                {/* <Field
                    id="email"
                    name="email"
                    type="email"
                    /*все события в том числе и значения аттрибута value Field будет получать автоматически(так как компонент Formik внутри себя использует контекст)и к примеру значение аттрибута value будет автоматически бартся для этого Field  в зависимости от значения его пропса name */}
                <MyTextInput id='email' name='email' type='email' label="Ваша почта" ></MyTextInput>
                <label htmlFor="amount">Количество</label>
                <Field
                    id="amount"
                    name="amount"
                    type="number"
                />
                <ErrorMessage className='error' name='amount'>{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>
                <label htmlFor="currency">Валюта</label>
                <Field
                    id="currency"
                    name="currency"
                    as ="select"/*поскольку Field такой общий компонент который по умолчанию рендерит input тут мы ему говорим что мы рендерим Field в качестве элемента select */>
                        <option value="">Выберите валюту</option>
                        <option value="USD">USD</option>
                        <option value="UAH">UAH</option>
                        <option value="RUB">RUB</option>
                </Field>
                <ErrorMessage className='error' name='currency'>{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>
                <label htmlFor="text">Ваше сообщение</label>
                <Field 
                    id="text"
                    name="text"
                    as='textarea'
                />
                <ErrorMessage className='error' name='name'>{(msg)=><div className='error'>{msg}</div>}</ErrorMessage>
                <MyCheckBox name="terms">Соглашаетесь с политикой конфиденциальности?</MyCheckBox>
                <button type="submit">Отправить</button>
        </Form>
        </Formik>
    )
}
export default CustomForm;