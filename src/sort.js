
function isWithinPastNDays(dateToCheck, referenceDate, days) {
  const daysAgo = new Date(referenceDate);
  daysAgo.setDate(daysAgo.getDate() - days);
  return dateToCheck >= daysAgo && dateToCheck <= referenceDate;
}

export function filterCampaignsByDate(campaigns, referenceDate, days) {
    return campaigns.filter(campaign => {
        const ldate = new Date(campaign.ldate);
        return isWithinPastNDays(ldate, referenceDate, days);
    });
}