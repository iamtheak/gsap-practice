import { ReactElement } from "react"

const Content = ({children}:{children:ReactElement})=>{
    return(
    <div className="content" style={{fontSize:"2rem"}}>
        {children}
    </div>
    )
}

export default Content;