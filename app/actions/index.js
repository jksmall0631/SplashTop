export const storePics = (pics) => {
  return {
    type: 'STORE_PICS',
    data: pics,
  }
}

export const appendSelfie = (selfie, createdAt) => {
  return {
    type: 'APPEND_SELFIE',
    data: { createdAt, selfie },
  }
}
