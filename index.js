const form = document.querySelector('#a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.querySelector('.stepper-panel')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.querySelector('#btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-outline')
let step = 0

// variables for amounts and price of products
let totalPrice = 5298
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const cart = document.querySelector('.cart')
const totalPriceElement = document.querySelector('.total-price')

function handleBtnControlClicked(e) {
  e.preventDefault()
  const nowStep = steps[step]
  if (e.target.matches('.btn-primary') && e.target.innerText === '下一步') {
    const nextStep = steps[step + 1]
    nowStep.classList.remove('active')
    nowStep.classList.add('checked')
    nextStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step + 1].classList.toggle('d-none')
    step += 1
  } else if (e.target.matches('.btn-outline')) {
    const prevStep = steps[step - 1]
    nowStep.classList.remove('active')
    prevStep.classList.remove('checked')
    prevStep.classList.add('active')
    formParts[step].classList.toggle('d-none')
    formParts[step - 1].classList.toggle('d-none')
    step -= 1
  }
  setBtnState()
}

function setBtnState() {
  if (step === 0) {
    prevBtn.classList.remove('btn-mobile-half')
    prevBtn.classList.add('d-none')
    prevBtn.classList.add('hidden')
    nextBtn.classList.remove('btn-mobile-half')
  }
  if (step === 1) {
    prevBtn.classList.remove('d-none')
    prevBtn.classList.add('btn-mobile-half')
    prevBtn.classList.remove('hidden')
    nextBtn.classList.add('btn-mobile-half')
  }
  if (step === 2) {
    nextBtn.innerText = '確認下單'
  } else {
    nextBtn.innerText = '下一步'
  }
}

// calculate amounts and price of products
function handleBtnAmountClicked(e) {
  if (!e.target.matches('.fas')) return
  const productAmountElement = e.target.parentElement.children[1]
  let productAmount = productAmountElement.innerText
  const productInfoElement = productAmountElement.parentElement.parentElement
  const eachPrice = Number(productInfoElement.dataset.price)
  if (e.target.matches('.fa-minus')) {
    if (productAmount <= 0) return
    productAmount--
    totalPrice -= eachPrice
  }
  if (e.target.matches('.fa-plus')) {
    productAmount++
    totalPrice += eachPrice
  }
  productAmountElement.innerText = productAmount
  const pricesElement = productAmountElement.parentElement.nextElementSibling
  pricesElement.innerText = formatter.format(productAmount * eachPrice)
  totalPriceElement.innerText = formatter.format(totalPrice)
}

btnControl.addEventListener('click', handleBtnControlClicked)
cart.addEventListener('click', handleBtnAmountClicked)