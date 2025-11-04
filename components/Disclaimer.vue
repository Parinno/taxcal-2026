<template>
    <div class="disclaimer-tax-calculator">
        <div class="disclaimer-tax-calculator-content">
            <p class="disclaimer-tax-calculator-content-title">หมายเหตุ</p>
            <ul class="disclaimer-tax-calculator-content-list">
                <li class="disclaimer-tax-calculator-content-item">
                    โปรแกรมคำนวณภาษีนี้ถือเป็นการคำนวณเบื้องต้นเท่านั้น
                    โดยใช้ข้อมูลของปีภาษี 2568 ฟินโนมีนาขอไม่รับรองความถูกต้องของข้อมูลและผลลัพธ์ 
                    ทั้งนี้รายการลดหย่อนเพิ่มเติมในปีภาษี 2568 กรุณาตรวจสอบเพิ่มเติมจากประกาศของกรมสรรพากร
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    การลงทุนในกองทุนรวมไม่ใช่การฝากเงิน
                    กองทุนอาจมีการลงทุนกระจุกตัวในประเทศหรืออุตสาหกรรมที่เกี่ยวข้องกับ ESG ซึ่งอาจทำให้มีความเสี่ยงสูง
                    ผู้ลงทุนควรกระจายความเสี่ยงและพิจารณาความเหมาะสมกับพอร์ตการลงทุนโดยรวมของตนเอง
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    ผลการดำเนินงานในอดีตมิได้ยืนยันผลการดำเนินงานในอนาคต
                    สิทธิประโยชน์ทางภาษีขึ้นอยู่กับข้อกำหนดของกรมสรรพากรซึ่งอาจมีการเปลี่ยนแปลงได้
                    ผู้ลงทุนควรศึกษาหรือปรึกษาผู้เชี่ยวชาญด้านภาษีก่อนการลงทุน
                </li>
                <li class="disclaimer-tax-calculator-content-item">
                    สอบถามข้อมูลเพิ่มเติมหรือขอรับหนังสือชี้ชวนได้ที่ บริษัทหลักทรัพย์นายหน้าซื้อขายหน่วยลงทุน ฟินโนมีนา จำกัด
                    ในช่วงเวลาวันทำการตั้งแต่ 09:00-17:00 น.
                    ที่หมายเลขโทรศัพท์ 02 026 5100
                    และทาง LINE @FinnomemaPort
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