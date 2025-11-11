import { stringify } from "csv-stringify/sync";

export function generateCSV(campaigns) {
    const compCamp = campaigns.map((c) => ({
        ...c,
        totalBounces: c.softbounces + c.hardbounces
    }));
    return stringify(compCamp, {
        header: true,
        columns: [
            {key: "id", header:'campaignId'},
            {key: "name", header:'campaignName'},
            {key: "sdate", header:'sendDate'},
            {key: "ldate", header:'ldate'},
            {key: "send_amt", header:'emailsSent'},
            {key: "opens", header:'totalOpens'},
            {key: "linkclicks", header:'totalClicks'},
            {key: "totalBounces", header:'totalBounces'},
            {key: "unsubscribes", header:'totalUnsubscribes'}
        ]
    });
}