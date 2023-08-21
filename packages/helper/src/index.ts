export const sleep = (time: number) => new Promise(resolve => setTimeout(resolve, time))

export const formatAddress = (address: string) => {
    if (!address) {
        return ""; // If the address is undefined, return an empty string
      }
      if (address.length <= 12) {
        return address; // If the address is shorter than 12 characters, return it as is
      } else {
        const prefix = address.slice(0, 6); // Get the first six characters
        const suffix = address.slice(-6); // Get the last six characters
        return `${prefix}...${suffix}`; // Combine the first six, ..., and last six characters
      }
}