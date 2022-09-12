import { useState } from 'react';
import classes from '../styles/formbuilder.module.css';
import FieldGenerator from './FieldGenerator';
import { Preview } from './Preview';

const containerFields = {};
function FormBuilder() {
    const [showForm, setShowForm] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [fields,setfields] = useState([]);
    const [pid,setPid] = useState(null);
    const clickHandler = (pid) => {
        setShowForm(true);
        setPid(pid);
    }

    const createField = (data) => {
        if(data.type.includes('container')){
            console.log('container adding [] ',data);
            containerFields[data.fieldid] = [];
        }
        console.log(data, fields, containerFields);
        if(!pid){

            setfields(prev => [...prev, data]);
        }
        else{
            const index = fields.findIndex(item => item.fieldid === pid);
            if(fields[index].type.includes('container')){
                containerFields[pid].push(data);
                return;
            }
            const updatedFields = [...fields];
            updatedFields.splice(index+1,0,data);
            setfields(updatedFields);
        }
        console.log(fields);
    }
    const changeShowForm = () => {
        setShowForm(false);
    }

    const showFields = () => {
        return fields.map((ele,index) => {
            return <div  key={index}>
            <div style={{backgroundColor: 'lightgray', margin: '5px'}}>
                {ele.type === 'container' | ele.plural ? <>
                <span>{ele.entryname}</span> <br/> <br />
                </> : ''}
                <label htmlFor={ele.fieldname}>{ele.fieldname}:  </label>
                <input type="text" id={ele.fieldid} name={ele.fieldname} />
                {ele.type === 'container' ?<>
                <div className='ct'>
                {containerFields[ele.fieldid] &&  containerFields[ele.fieldid].map((e,index) => {
                    return <> <label htmlFor={e.fieldname}>{e.fieldname}:  </label>
                    <input type="text" id={e.fieldid} name={e.fieldname} /></>;
                })}
                </div>
                 <br /><br />
                 <button  onClick={()=>clickHandler(ele.fieldid)}> +add container field</button>
                 </> : ''}
            </div>
            {ele.type !== 'container' ? <button  onClick={()=> clickHandler(ele.fieldid)}> +add field</button> : ''}
            <hr/>
            </div>
        })
    }
    if(showPreview){
        return <Preview datafields={fields} containerfields={containerFields} onHide={()=>setShowPreview(false)} />
    }
    return (<>
        {!showForm ?
            <div className={classes['form-builder']}>
                <span>App Fields <button onClick={()=>setShowPreview(true)}>Preview</button></span>
                <hr />
                <div>{ fields.length === 0 ?
                    <div style={{ border: '1px dotted black', height: '50px', margin: '10px' }} >
                        <span>No fields exits</span>
                    </div> : showFields()}
                </div>
                <button style={{ marginBottom: '10px' }} onClick={()=>clickHandler(null)}> +add field</button>
            </div> : <FieldGenerator cancel={changeShowForm} create={createField} />}
    </>
    );
}

export default FormBuilder;
