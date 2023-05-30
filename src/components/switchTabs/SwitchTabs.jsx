import { useState } from 'react';
import style from './SwitchTabs.module.scss' ;
const SwitchTabs =({data, onTabChange})=>{

    const [selectedTab, setSelectedTab] = useState(0) ;
    const [left, setLeft] =useState(0) ;

    const activeTab = (tab, index)=>{
        setLeft(index * 100);
        setTimeout(()=>{
            setSelectedTab(index)
        },300); 
        onTabChange(tab, index)
    }

    return (<div className={style.switchingTabs}>
        <div className={style.tabItems}>
            {data?.map((tab, index)=>(
                <span 
                key={index}
                className={`${style.tabItem}${selectedTab === index?(" "+style.active):""}`}
                onClick={()=>{activeTab(tab, index)}}>
                    {tab}
                </span>
            ))}
            <span className={style.movingBg} style={{left}}/>

        </div>
    </div>) ;

}

export default SwitchTabs ;