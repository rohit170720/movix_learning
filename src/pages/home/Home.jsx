import style from './Home.module.scss'
import HeroBanner from './heroBanner/HeroBanner';
import Popular from './popular/Popular';
import TopRated from './topRated/TopRated';
import Trending from './trending/Trending';
const Home =()=> {
 return(<div className={style.homePage}>
    <HeroBanner/>
    <Trending/>
    <Popular/>
    <TopRated/>

    </div>)
}
export default Home ;