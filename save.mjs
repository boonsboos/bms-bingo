export class Save {    

    constructor(todaysDate) {
        let saveFile = localStorage.getItem("saveFile");
        if (saveFile != null) {
            let decodedSave = JSON.parse(saveFile)

            this.cardNumber = decodedSave.cardNumber;
            this.checkedSquares = decodedSave.checkedSquares;
            this.date = new Date(decodedSave.date).getTime();
            // reset save if the day has changed
            if (this.date < todaysDate || Number.isNaN(this.date)) {
                localStorage.removeItem("saveFile"); // yes this is a hack but it works so /shrug
                
            }
            return;
        }

        this.date = todaysDate
        this.cardNumber = Math.floor(Math.random() * 5) + 1;
        this.checkedSquares = Array(25).fill(0);
    }

    async save() {
        localStorage.setItem(
            "saveFile",
            JSON.stringify({
                cardNumber: this.cardNumber,
                checkedSquares: this.checkedSquares,
                date: this.date
            }
        ));
    }
}