/**
 *
 * CREATION DATE: 27.08.2021
 *
 * PROGRAMMER:    Daniel Konev.
 *
 * PURPOSE:       Audio books web store application.
 *                Reader page.
 *
 */

import ReaderPageView from "./reader_page";

export default function ReaderPage(props) {

    const path = "../../../../../../react-tut/сказка/e18cbcae-0579-11ec-a980-0cc47a792c0a_id_e18cbcae-0579-11ec-a980-0cc47a792c0a_files";

    const pages = [
        `<div style="position:absolute;left:50%;margin-left:-595px;top:0px;width:1190px;height:595px;border-style:outset;overflow:hidden">
        <div style="position:absolute;left:0px;top:0px">
        <img src="https://sun9-70.userapi.com/impg/_HSjhGI8F8PLRIPIIsKOXXTtknLjJzuGO54EaQ/Tn89lgzsWsI.jpg?size=1521x761&quality=96&sign=f4a1862de0dd332f94daa6dc2ee6420d&type=album" width="1190" height="595"></div>
        <div style="position:absolute;left:827.84px;top:54.45px" class="cls_002"><span class="cls_002">Карина Туалби</span></div>
        <div style="position:absolute;left:310.24px;top:241.62px" class="cls_003"><span class="cls_003">Все права защищены автором</span></div>
        <div style="position:absolute;left:351.03px;top:256.02px" class="cls_003"><span class="cls_003">Карина Туалби</span></div>
        <div style="position:absolute;left:806.12px;top:497.85px" class="cls_004"><span class="cls_004">Рисунки Натальи Орловой</span></div>
        <div style="position:absolute;left:853.49px;top:521.69px" class="cls_005"><span class="cls_005">Москва, 2021</span></div>
        </div>`,
        `<div style="position:absolute;left:50%;margin-left:-595px;top:605px;width:1190px;height:595px;border-style:outset;overflow:hidden">
        <div style="position:absolute;left:0px;top:0px">
        <img src="https://sun9-82.userapi.com/impg/26WCXhmTovBZgMxnZ1GjCJHCtBlwPzgF_k-BNA/fcjzv3imx2Y.jpg?size=1521x761&quality=96&sign=755390827e18744ebfbe21b07919f7c7&type=album" width="1190" height="595"></div>
        <div style="position:absolute;left:657.64px;top:85.16px" class="cls_005"><span class="cls_005">В солнечном лесу, где порхают бабочки удивительной окраски и</span></div>
        <div style="position:absolute;left:637.80px;top:101.96px" class="cls_005"><span class="cls_005">распускаются цветы фантастической красоты, живёт крепкая семья: строгий</span></div>
        <div style="position:absolute;left:637.80px;top:118.76px" class="cls_005"><span class="cls_005">папа-лис, заботливая мама-лиса и их любознательный сынок по имени Дэни.</span></div>
        <div style="position:absolute;left:657.64px;top:152.36px" class="cls_005"><span class="cls_005">В их уютном домике каждый день происходят разные события. Порой</span></div>
        <div style="position:absolute;left:637.80px;top:169.16px" class="cls_005"><span class="cls_005">совершенно обычные, а порой и не очень.</span></div>
        </div>`
    ];

    return (
        <ReaderPageView pages={pages} />
    );
}