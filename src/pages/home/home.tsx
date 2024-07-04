import { useTranslation } from 'react-i18next';
import React from "react";

import './home.scss';
 
function Home()  {
    const { t } = useTranslation("global")

    return <div id="home">
        <div className="section first">
            <div className='banner-image'>
                <div className='banner-blur'>
                <table className='banner-table'>
                    <tr className='banner-row'>
                        <td className='banner-cell'>
                            <div className='card'>
                                <h1>{t("business_name")}</h1>
                                <h3>{t("services_1")}</h3>
                                <h3>{t("services_2")}</h3>
                                <h3>{t("services_3")}</h3>
                                <table className='icons-table'>
                                    <tr className='icons-row'>
                                        <td className='icons-cell'>
                                            <img src="src/assets/icons/calendar.svg" alt="" className='service-icon'/>
                                        </td>
                                        <td className='icons-text'>
                                            <h5>{t('item_1')}</h5>
                                        </td>
                                        <td className='icons-cell'>
                                            <img src="src/assets/icons/protect.svg" alt="" className='service-icon'/>
                                        </td>
                                        <td className='icons-text'>
                                            <h5>{t('item_2')}</h5>
                                        </td>
                                    </tr>
                                    <tr className='icons-row'>
                                        <td className='icons-cell'>
                                            <img src="src/assets/icons/lock.svg" alt="" className='service-icon'/>
                                        </td>
                                        <td className='icons-text'>
                                            <h5>{t('item_3')}</h5>
                                        </td>
                                        <td className='icons-cell'>
                                            <img src="src/assets/icons/world.svg" alt="" className='service-icon'/>
                                        </td>
                                        <td className='icons-text'>
                                            <h5>{t('item_4')}</h5>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                        <td className='banner-cell last-cell'>
                            <div className='learn'>
                                {t('learn')}
                            </div>
                            <div className='get-in-touch'>
                                {t('get_in_touch')}
                            </div>
                        </td>
                    </tr>
                </table>
                </div>
            </div>
        </div>
        <div className="section second">

        </div>
    </div>
};
 
export default Home;