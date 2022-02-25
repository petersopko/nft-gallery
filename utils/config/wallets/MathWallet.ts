import { SupportWallet } from '@/utils/config/wallets'
import { BaseDotsamaWallet } from '@/utils/config/wallets/BaseDotsamaWallet'

export class MathWallet extends BaseDotsamaWallet {
  // img: require('@/assets/partners/logo-mathwallet.png'),
  extensionName = 'mathwallet'
  img = ''
  name = 'Math Wallet'
  source = SupportWallet.Math
  walletUrl = 'https://mathwallet.org/en-us/'
  guideUrl = 'https://blog.mathwallet.org/?p=540'
  isBrowserExtension = false
  isMobileApp = true
}
