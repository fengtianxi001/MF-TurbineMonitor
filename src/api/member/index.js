import request from "../../utils/request";

export const queryMember = id => {
    return request({
        url: "/member/" + id,
        method: "get",
        params: null,
    });
};
