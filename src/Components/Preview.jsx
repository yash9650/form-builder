import React from "react"
export const Preview = ({datafields,containerfields,onHide})=>{
    return <div className="prev-container">
         <span> My Form <button onClick={onHide}>Hide</button></span>
        <hr color="black" style={{width:"100%"}}/>
        {datafields.map((ele,index) => {
            return <div style={{backgroundColor: 'lightgray', margin: '5px',padding:'10px'}}>
               
                {ele.type === 'container' | ele.plural ? <>
                <span>{ele.entryname}</span> <br/> <br />
                </> : ''}
                <label htmlFor={ele.fieldname}>{ele.fieldname}:  </label>
                <input type="text" id={ele.fieldid} name={ele.fieldname} />
                {ele.type === 'container' ?<>
                <div className='ct'>
                {containerfields[ele.fieldid] &&  containerfields[ele.fieldid].map((e,index) => {
                    return <> <label htmlFor={e.fieldname}>{e.fieldname}:  </label>
                    <input type="text" id={e.fieldid} name={e.fieldname} /></>;
                })}
                </div></> : ''}
            </div>
        })}
    </div>
}