function getCurrentDateFormattedPadded(): string {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Pad with 0 if needed
    const day = String(today.getDate()).padStart(2, '0');      // Pad with 0 if needed
    const year = today.getFullYear().toString().slice(-2);
  
    return `${month}-${day}-${year}`;
}

export {
    getCurrentDateFormattedPadded
}