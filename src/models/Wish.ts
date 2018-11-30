import firebase from "firebase";
import moment from "moment";

export default class Wish {
    name: string;
    harvested: boolean;
    completed: boolean;
    created_at: firebase.firestore.Timestamp;

    constructor(data: firebase.firestore.DocumentData) {
        this.name = data.name;
        this.harvested = data.harvested;
        this.completed = data.completed;
        this.created_at = data.created_at;
    }

    getDate() {
        return moment.unix(this.created_at.seconds).fromNow();
    }

    getPercentage(daysToGrow: number) {
        let created = moment.unix(this.created_at.seconds);
        let now: moment.Moment = moment();

        let days = moment.duration(now.diff(created)).asDays();

        if (days > daysToGrow) {
            return 100;
        }

        return Math.ceil((days / daysToGrow) * 100);
    }
}
