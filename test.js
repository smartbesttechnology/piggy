function generateRandomNumber(length) {
    let result = "";
    const characters = "0123456789";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    // Pad the result with leading zeros to ensure consistency
    return result.padStart(length, "0");
}
  
const xy = generateRandomNumber(6)
console.log(xy)