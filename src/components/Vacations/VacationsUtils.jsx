//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>//
//>>>>>>>>> Date Format conversion to match calender library date >>>>>>>>//
export const isoToLong = (date) => new Date(date);

export const longToIso = (date) => {
  var _date = new Date(date.getTime());
  // adding 2 hours to fix local date conversion issue with js date.
  _date.setHours(date.getHours() + 2);
  return _date.toISOString().substring(0, 10);
};

export const originalToRendered = (originalFormat) => {
  if (originalFormat) {
    let renderedFormat = originalFormat.map((element) => {
      return {
        ...element,
        color: element.type.color,
        startDate: isoToLong(element.startDate),
        endDate: isoToLong(element.endDate),
      };
    });
    return renderedFormat;
  }
};

export const renderedToOriginal = (renderedFormat) => {
  if (renderedFormat) {
    let originalFormat = renderedFormat.map((element) => {
      delete element.color;
      return {
        ...element,
        startDate: longToIso(element.startDate),
        endDate: longToIso(element.endDate),
      };
    });
    return originalFormat;
  }
};

export const createEmptyOriginalObj = () => {
  return {
    id: 0,
    type: { id: 0, name: "", color: "" },
    reason: "",
    created_by: "",
    updated_by: "",
    startDate: "",
    endDate: "",
  };
};

export const createFormData = (vacation) => {
  return {
    type_id : vacation.type.id,
    reason : vacation.reason,
    start_date : vacation.startDate,
    end_date : vacation.endDate,
  }
}

//<<<<<<<<< Date Format conversion to match calender library date <<<<<<<<//
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//
