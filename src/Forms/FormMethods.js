export default class FormMethod{


    static self = null;

    /**
     * Handle Input Change
     * @warning DO NOT CHANGE!
     * @param event
     */
    static handleInputChange = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;




        FormMethod.self.setState({
            [name]: value
        }, () => {
            // console.log(FormMethod.self.state);
        });

    };

}