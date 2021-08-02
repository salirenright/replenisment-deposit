'use strict';
const depositAmountInputEl=document.getElementById('amount-input');
const periodInputEl=document.getElementById('period-input');
const totalAmountEl=document.getElementById('total');
const profitEl=document.getElementById('profit');
const percentEl=document.getElementById('percent');
const amountInputErrorEl=document.getElementById('amount-error');
const periodInputErrorEl=document.getElementById('period-error');
function calculateIncome(depositAmount, depositPeriod){
    let interestRate;
    if (3<=depositPeriod&&depositPeriod<6){
        interestRate=2;
    } else if (depositPeriod<9){
        interestRate=2.2;
    } else if (depositPeriod<12) {
        interestRate = 2.3;
    } else if (depositPeriod<18) {
        interestRate = 2.6;
    } else if (depositPeriod===18) {
        interestRate = 2.7;
    }
    //const income=Number(((depositAmount*interestRate*depositPeriod)/12).toFixed());
    //const totalAmount=(depositAmount*Math.pow((1+(interestRate*depositPeriod)/(12*100)),depositPeriod)).toFixed();
    const totalAmount=(depositAmount*Math.pow((1+(interestRate)/(12*100)),depositPeriod)).toFixed();

    const income=totalAmount-depositAmount;
    return {
        income,
        totalAmount,
        interestRate,
    };
}
function handleSubmit(evt) {
    evt.preventDefault();
    amountInputErrorEl.textContent='';
    periodInputErrorEl.textContent='';
    totalAmountEl.textContent='';
    profitEl.textContent='';
    percentEl.textContent='';

    const deposit = Number(depositAmountInputEl.value);
    const period = Number(periodInputEl.value);
    // const specialAmount = Number(specialAmountInputEl.value);

    if (Number.isNaN(deposit)){
        amountInputErrorEl.textContent='Неверное значение. Введите число, например: 15000';
        return;
    }
    if (!Number.isFinite(deposit)){
        amountInputErrorEl.textContent='Слишком большое значение. Введите число, например: 15000';
        return;
    }
    if (deposit<15000){
        amountInputErrorEl.textContent='Неверное значение. Минимальная сумма: 15000 ₽';
        return;
    }
    if (deposit>50000000){
        amountInputErrorEl.textContent='Неверное значение. Максимальная сумма: 50000000 ₽';
        return;
    }
    if (Number.isNaN(period)){
        periodInputErrorEl.textContent='Неверное значение. Введите число месяцев, например: 3';
        return;
    }
    if (!Number.isFinite(period)){
        periodInputErrorEl.textContent='Слишком большое значение. Введите число, например: 3';
        return;
    }
    if (period<3){
        periodInputErrorEl.textContent='Неверное значение. Минимальный период: 3 месяца';
        return;
    }
    if (period>18){
        periodInputErrorEl.textContent='Неверное значение. Максимальный период: 18 месяцев';
        return;
    }
    const result = calculateIncome(deposit, period);
    totalAmountEl.textContent=`${result.totalAmount}`;
    profitEl.textContent=`${result.income}`;
    percentEl.textContent=`${result.interestRate}`;
}
const formEL=document.getElementById('deposit-form');
formEL.addEventListener('submit',handleSubmit);