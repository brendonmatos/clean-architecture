const getNumbers = (text) => {
	return text.replace(/\D/g,'')
}

const isAllNumbersTheSame = (text) => {
	const [firstLetter] = text
	return [...text].every(letter => letter === firstLetter)
}

const hasValidLength = (text) => {
	return text.length === 11
}

const toDigitArray = (text) => {
	return [...text].map(i => parseInt(i))
}

const calculateCheckDigit = (cpf, factor, max) => {
	let total = 0;
	for (const digit of toDigitArray(cpf).slice(0, max)) {
		total += digit * factor--;
	}
	return (total%11 < 2) ? 0 : (11 - total%11);
}

const calculateCheckDigits = (cpf) => {
	const digit1 = calculateCheckDigit(cpf, 10, 9)
	const digit2 = calculateCheckDigit(cpf, 11, 10)
	return `${digit1}${digit2}`
}

const extractCheckDigit = (cpf) => {
	return cpf.substring(cpf.length-2, cpf.length)
}

export function validateCPF(cpf = "") {
	if( !cpf ) {
		return false
	}

	cpf = getNumbers(cpf)
	if (!hasValidLength(cpf)){  
		return false
	}	
	
	if (isAllNumbersTheSame(cpf)) {
		return false
	}
  
	return extractCheckDigit(cpf) === calculateCheckDigits(cpf);
}