import {Purchases} from 'react-native-purchases';

const checkUserPremium = async () => {
  try {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log('PREM CHECK:', customerInfo);

    // Check users Entitlement for PREMIUM Subscription.
    if (typeof customerInfo.entitlements.active.asdasd !== 'undefined') {
      // Grant user "pro" access as Entitlement was found.
      return true;
    } else {
      // User is not Premium User.
      return false;
    }

  } catch (e) {
    // Error fetching customer info
    console.error(e);
    return false;
  }
};

export default checkUserPremium;
