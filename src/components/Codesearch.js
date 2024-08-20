import React from "react";
import Select from "react-select";

class CodeSearch extends Components {
  constructor(props) {
    super(props);
    console.log("CodeSearch constructor");
    this.state = {
      selectedOption: "", //드롭다운 항목에서 최종적으로 선택한 종목의 코드번호 저장됨.
      options: [], //모든 종목의 정보
      filteredOptions: [],
    };
  }

  handleSelectChange = (selectedOption) => {
    this.props.handlerSelectedCode(selectedOption.code);
  };
  handleRadioChange = (e) => {
    if (e.target.value == "spac") {
      this.setState({
        filteredOptions: this.state.options.filter(
          (item) => item.is_spac === "Y"
        ),
      });
    } else {
      //"all"
      this.setState({
        filteredOptions: [],
      });
    }
  };
}
