class MyDependancy {
    constructor(first, second) {
        this.args = {
            first: first,
            second: second
        };
    }

    getDependancy() {
        return 'Dependancy method!';
    }
}

export default MyDependancy;
