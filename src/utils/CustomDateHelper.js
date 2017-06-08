import nlp from 'compromise';

export default class CustomDateHelper {

    static parseCustomDateInput(customDateInput) {
        return nlp(customDateInput, this.getLexicon()).normalize().dates().not('#Day').not('#Holiday').dates();
    }

    static getCustomDate(input) {
        let parsedCustomDate = this.parseCustomDateInput(input).out('array');
        if (parsedCustomDate.length !== 1) {
            return null;
        } else {
            let dateString = parsedCustomDate[0];
            // Remove [st | nd | rd | th ] and commas from string.
            let display = input.replace(/(\d+)(st|nd|rd|th)/, '$1').replace(/,/g, "");
            // Convert input such as "New Year's Day January 1st" to "january 1".
            let dateToConvert = nlp(display, this.getLexicon()).normalize().dates().not('#Day').not('#Holiday').normalize().out();
            let date = new Date(dateToConvert);
            if (isNaN(Date.parse(date))) {
                return null;
            } else {
                let regExp = new RegExp(dateToConvert, 'i');
                return {
                    // Display normalized description + date using mm/dd/yyyy.
                    displayName: `until ${display.replace(regExp, "").trim()} (${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()})`,
                    endDate: dateToConvert
                };
            }
        }
    }

    static getLexicon() {
        // List of words that nlp recognizes as `Date` words which should be ignored for proper parsing.
        return {
            "day": "Day",
            "days": "Day",
            "date": "Day",
            "dates": "Day",
            "weekend": "Day",
            "weekday": "Day",
            "monday": "Day",
            "tuesday": "Day",
            "wednesday": "Day",
            "thursday": "Day",
            "friday": "Day",
            "saturday": "Day",
            "sunday": "Day",
            "mon": "Day",
            "tue": "Day",
            "wed": "Day",
            "thurs": "Day",
            "fri": "Day",
            "sat": "Day",
            "sun": "Day",
            "tomorrow": "Day",
            "week": "Day",
            "year": "Day",
            "christmas": "Holiday",
            "thanksgiving": "Holiday",
            "mother's": "Holiday",
            "easter": "Holiday",
            "independence": "Holiday",
            "father's": "Holiday",
            "halloween": "Holiday",
            "saint patrick's": "Holiday",
            "new year's": "Holiday",
            "new years": "Holiday",
            "new year": "Holiday",
            "new year's eve": "Holiday",
            "new years eve": "Holiday",
            "new year eve": "Holiday"
        }
    }

}
