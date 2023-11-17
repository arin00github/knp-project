import React, { useEffect, useMemo, useState } from "react";

import { FormControl, Select } from "@innodep/tms-react-ui";
import { Field, FieldProps } from "formik";

import { EditAssetGroupFormValues } from "./EditFormPage";

import { GetCommonCodeParams, GetCommonCodeResponse, GetCommonCodeResult } from "@/services/api/code/CodeInterface";
import CodeService from "@/services/api/code/CodeService";
import { AttributesGetType } from "@/services/api/layer/LayerInterface";
import { StyledFormErrorMessage } from "@/styles";

interface SelectOptionsForTypecdProps {
    arrayIndex: number;
    values: EditAssetGroupFormValues;
    readonly: boolean;
    fieldCommonName: keyof EditAssetGroupFormValues;
}

const SelectOptionsForTypecd = (props: SelectOptionsForTypecdProps) => {
    const { arrayIndex, values, readonly, fieldCommonName } = props;

    const [commonCodes, setCommonCodes] = useState<GetCommonCodeResult[]>([]);

    const selectedDataType = useMemo(() => {
        const attrbutes = values[fieldCommonName] as AttributesGetType[];
        return attrbutes[arrayIndex].type;
    }, [arrayIndex, values, fieldCommonName]);

    const getCommonCode = async (params: GetCommonCodeParams): Promise<GetCommonCodeResponse> => {
        const service = CodeService();
        const res = await service.getCommonCode(params);
        return new Promise((resolve, reject) => {
            if (res?.code === 200) {
                resolve(res as GetCommonCodeResponse);
            } else {
                reject(res?.message);
            }
        });
    };

    useEffect(() => {
        const isMounted = true;
        getCommonCode({ code: "", code_name: "" }).then((res) => {
            if (isMounted) {
                const codeArray = res.response.results.filter((code) => code.p_code === "root");
                setCommonCodes(codeArray);
            }
        });
    }, []);

    return (
        <td style={{ width: "17%" }}>
            {selectedDataType === "CODE" && (
                <Field name={`${fieldCommonName}.${arrayIndex}.type_cd`}>
                    {({ field, meta }: FieldProps) => {
                        return (
                            <FormControl
                                size={"sm"}
                                style={{ padding: "4px 0" }}
                                invalid={meta.touched && !!meta.error}
                            >
                                <Select readOnly={readonly} id={field.name} {...field} onChange={field.onChange}>
                                    <option value="">유형선택</option>
                                    {commonCodes.map((type) => (
                                        <option value={type.code} key={`type_${type.code}`}>
                                            {type.code_name}
                                        </option>
                                    ))}
                                </Select>
                                <StyledFormErrorMessage className="error">{meta.error}</StyledFormErrorMessage>
                            </FormControl>
                        );
                    }}
                </Field>
            )}
        </td>
    );
};

export default SelectOptionsForTypecd;
