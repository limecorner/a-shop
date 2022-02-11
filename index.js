const form = document.querySelector('#a-form')
const formParts = form.querySelectorAll('.part')
const stepControl = document.querySelector('.stepper-panel')
const steps = stepControl.querySelectorAll('.step')
const btnControl = document.querySelector('#btn-control')
const nextBtn = btnControl.querySelector('.btn-primary')
const prevBtn = btnControl.querySelector('.btn-outline')
let step = 0

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

btnControl.addEventListener('click', handleBtnControlClicked)