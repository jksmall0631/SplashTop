export const storePics = (pics) => {
  return {
    type: 'STORE_PICS',
    data: pics,
  }
}

export const appendSelfie = (img, createdAt) => {
  return {
    type: 'APPEND_SELFIE',
    data: { createdAt, img },
  }
}
