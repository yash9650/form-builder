import { useRef, useState } from 'react';
import classes from '../styles/formbuilder.module.css';

function FieldGenerator(props){
    const [isPlural,setIsPlural] = useState(false);
    const [isContainer, setIsContainer] = useState(false);

    const fieldnameRef = useRef();
    const fieldidRef = useRef();
    const entryNameRef = useRef();

    const cancelHandler = () =>{
        props.cancel();
    }

    const createHandler = () => {
        const itemtype = !isContainer ? 'field' : 'container';
        if(isPlural || isContainer){
            const field = {
                type: itemtype,
                fieldname: fieldnameRef.current.value,
                fieldid: fieldidRef.current.value,
                plural: isPlural,
                entryname: entryNameRef.current.value
            };
            props.create(field);
        }else{
            const field = {
                type: itemtype,
                fieldname: fieldnameRef.current.value,
                fieldid: fieldidRef.current.value,
                plural: isPlural
            };
            props.create(field);
        }
        props.cancel();
    }

    return(
        <div className={classes['form-builder']}>
            <span>New Form Item</span>
            <hr />
            <div>
                <label htmlFor="type">item type: </label>
                <input checked={isContainer} type="radio" name="type" id="" value='Container' onChange={()=> setIsContainer(true)}/>Container
                <input checked={!isContainer} type="radio" name="type" id="" value='Field' onChange={()=> setIsContainer(false)}/>Field
                <br />
                <br />
                <label htmlFor="fieldname">Field name:  </label>
                <input type="text" name="fieldname" ref={fieldnameRef} id="" />
                <br />
                <br />
                <label htmlFor="fieldId">Field id:    </label>
                <input type="text" name="fieldId" ref={fieldidRef} id="" />
                <br />
                <br />
                <label htmlFor="plural">is plural field: </label>
                <input checked={isPlural} type="radio" name="plural" id=""  onChange={()=> setIsPlural(true)} value='yes'/> Yes
                <input checked={!isPlural} type="radio" name="plural" id=""  onChange={()=> setIsPlural(false)} value='no'/> No
                <br />
                <br />
                { isContainer || isPlural? <>
                <label htmlFor="">Entry name: </label>
                <input type="text" ref={entryNameRef} />
                </>: ''}
            </div>
            <button style={{margin: '10px'}} onClick={cancelHandler}>cancel</button>
            <button style={{margin: '10px'}} onClick={createHandler}>create</button>
        </div>
    );
}

export default FieldGenerator;