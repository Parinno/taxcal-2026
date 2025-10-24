<template>
    <div class="disclaimer-tax-calculator">
        <div class="disclaimer-tax-calculator-content">
            <p class="disclaimer-tax-calculator-content-title">หมายเหตุ</p>
            <ul class="disclaimer-tax-calculator-content-list">
                <li class="disclaimer-tax-calculator-content-item">
                    ผู้ลงทุนโปรดทำความเข้าใจลักษณะสินค้า เงื่อนไขผลตอบแทน และความเสี่ยงก่อนตัดสินใจลงทุน |
                    การลงทุนในหุ้นกู้ไม่ใช่การฝากเงิน |
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    การจัดอันดับความน่าเชื่อถือของหุ้นกู้เป็นเพียงข้อมูลประกอบการตัดสินใจลงทุนเท่านั้น
                    มิใช่สิ่งชี้นำการซื้อขายตราสารหนี้ที่เสนอขาย
                    และไม่ได้เป็นการรับประกันความสามารถในการชำระหนี้ของผู้ออกหุ้นกู้ | บลป. เดฟินิท
                    เป็นบริษัทในเครือฟินโนมีนา ซึ่งได้รับใบอนุญาตเป็นผู้ประกอบธุรกิจหลักทรัพย์
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    ประเภทที่ปรึกษาการลงทุนจากสำนักงาน ก.ล.ต. | บลป. เดฟินิท
                    เป็นเพียงผู้แนะนำและอำนวยความสะดวกในการขอจองซื้อหุ้นกู้กับบริษัทหลักทรัพย์ต่างๆ
                    ที่เปิดให้จองหุ้นกู้เท่านั้น
                    มิได้มีส่วนเกี่ยวข้องกับการจัดจำหน่ายหุ้นกู้แต่อย่างใด.
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    ติดต่อสอบถามข้อมูลได้ที่ บลป.เดฟินิท 02-109-9933
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.disclaimer-tax-calculator {
    background-color: #f2f3f4;
}

.disclaimer-tax-calculator-content {
    padding: 40px 84px;
}

.disclaimer-tax-calculator-content-title {
    color: #01172B;
    font-weight: bold;
    font-size: 13px;
    margin-bottom: 8px;
}

.disclaimer-tax-calculator-content-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.disclaimer-tax-calculator-content-item {
    font-size: 13px;
    font-weight: 400;
    color: #01172BA6;
    position: relative;
    padding-left: 16px;
}

.disclaimer-tax-calculator-content-item::before {
    content: "•";
    color: #01172BA6;
    font-weight: bold;
    position: absolute;
    left: 0;
    top: 0;
}

.disclaimer-tax-calculator-content-item:last-child {
    margin-bottom: 0;
}
</style>