import React, { useCallback, useRef, useState } from "react";

import { Button, Stack, useDisclosure } from "@innodep/tms-react-ui";
import { Form, Formik, FormikProps } from "formik";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import styled from "styled-components";

import FormCollection from "./FormCollection";

import { AssetGroupDetail, AttributesGetType } from "@/services/api/layer/LayerInterface";
import LayerService from "@/services/api/layer/LayerService";
import { DialogProps } from "@/services/interface/common.interface";
import { useAppDispatch, useAppSelector } from "@/services/store/hooks";
import { setIsFormOpen } from "@/services/store/setting/asset-group-slice";
import { transDataUrltoFile } from "@/services/utils";
import { StyledLayoutBodyWithHeaderFooter, StyledLayoutFooter, StyledLayoutHeader, StyledSmButton } from "@/styles";
import { LoadingSpinner } from "@/views/components/common";

export interface EditAssetGroupFormValues {
    layer_name: string;
    layer_id: string;
    const_attributes: AttributesGetType[];
    attributes: AttributesGetType[];
    delete_attributes: AttributesGetType[];
    icon_url: string;
    upload_icon: File[];
}

const constantAsset = ["geom", "asset_nm", "npk_cd", "npo_cd", "reg_date", "upd_date", "asset_type_cd", "id"];

const initialValues: EditAssetGroupFormValues = {
    layer_name: "",
    layer_id: "",
    const_attributes: [
        { comment: "고유번호", name: "id", type_cd: "none", type: "NUMERIC", ordering: 1 },
        { comment: "GIS위치", name: "geom", type_cd: "none", type: "GEOMETRY", ordering: 2 },
        { comment: "국립공원코드", name: "npk_cd", type_cd: "NPK", type: "CODE", ordering: 3 },
        { comment: "국립공원사무소코드", name: "npo_cd", type_cd: "NPO", type: "CODE", ordering: 4 },
        { comment: "명칭", name: "asset_nm", type_cd: "none", type: "STRING", ordering: 5 },
        { comment: "자산타입코드", name: "asset_type_cd", type_cd: "ASSET_TYPE", type: "CODE", ordering: 6 },
        { comment: "생성시간", name: "reg_date", type_cd: "none", type: "TIMESTAMP", ordering: 7 },
        { comment: "수정시간", name: "upd_date", type_cd: "none", type: "TIMESTAMP", ordering: 8 },
    ],
    attributes: [{ comment: "", name: "", type_cd: "", type: "", ordering: 9 }],
    delete_attributes: [],
    icon_url: "",
    upload_icon: [],
};

/**
 * 자산종류 관리 수정페이지에서 사용하는 폼
 * @returns
 */

const EditFormPage = () => {
    const dispatch = useAppDispatch();

    const storedAssetGroup = useAppSelector((state) => state.assetGroup);
    const { selectedRow } = storedAssetGroup;

    const [loading, setLoading] = useState<boolean>(true);

    const [formData, setFormData] = useState<EditAssetGroupFormValues>(initialValues);

    //[EDIT]모드일 때를 위해 수정 전 데이터 저장
    const [originData, setOriginData] = useState<EditAssetGroupFormValues>(initialValues);

    const [dialogState, setDialogState] = useState<DialogProps>({
        message: "",
        mode: "none",
        process: "init",
    });

    const editAssetGroupFormRef = useRef<FormikProps<EditAssetGroupFormValues>>(null);

    const { isOpen: isResultOpen, onClose: onResultClose, onOpen: onResultOpen } = useDisclosure();
    const { isOpen: isConfirmOpen, onClose: onConfirmClose, onOpen: onConfirmOpen } = useDisclosure();
    const handleCloseBtnClick = () => {
        dispatch(setIsFormOpen(false));
    };

    /**
     * FormDate를 생성하는 함수
     * @param values formik 가 관리하는 values
     * @returns {FormData} FormData형식의 데이터를 리턴
     */
    const createFormData = (values: EditAssetGroupFormValues) => {
        const formData = new FormData();
        formData.append("layer_name", values.layer_name);
        formData.append("layer_id", values.layer_id);
        const newAttrArray = values.attributes.map((attr) => {
            return {
                ...attr,
                type_cd: attr.type_cd || "none",
                not_null: false,
                visible: true,
                ordering: initialValues.attributes.length + attr.ordering,
            };
        });
        formData.append("attributes", JSON.stringify(newAttrArray));
        values.upload_icon.forEach((icon) => formData.append("image", icon));
        formData.append("image_size", "22px");
        return formData;
    };

    /**
     * 자산종류의 상세정보를 가져오는 함수
     * @param layerId 선택한 자산종류의 layer_id
     * @returns
     */
    const getAssetGroupDetail = async (layerId: string): Promise<AssetGroupDetail> => {
        setLoading(true);
        const service = LayerService();
        const getResponse = await service.getAssetGroupDetail(layerId);
        return new Promise((resolve, reject) => {
            if (getResponse?.code === 200) {
                resolve(getResponse.response as AssetGroupDetail);
            } else {
                reject(getResponse);
            }
        });
    };

    /**
     * getAssetGroupDetail 비동기 함수를 실행하고 그 결과를 formData에 반영하는 함수
     * @param layerId 선택한 자산종류의 layer_id
     */
    const updateAssetGroupDetail = (layerId: string) => {
        getAssetGroupDetail(layerId).then((resData) => {
            setLoading(false);
            const fileObject = transDataUrltoFile(resData.icon.image, layerId);
            const newFormData: EditAssetGroupFormValues = {
                ...formData,
                layer_id: resData.layer_id,
                layer_name: resData.layer_name,
                icon_url: resData.icon.image,
                const_attributes: resData.attributes
                    .sort((a, b) => a.ordering - b.ordering)
                    .filter((attr) => constantAsset.includes(attr.name)),
                attributes: resData.attributes
                    .sort((a, b) => a.ordering - b.ordering)
                    .filter((attr) => !constantAsset.includes(attr.name)),
                upload_icon: [fileObject],
            };
            setFormData(newFormData);
            setOriginData(newFormData);
        });
    };

    React.useEffect(() => {
        if (selectedRow) {
            if (dialogState.process === "init") {
                updateAssetGroupDetail(selectedRow);
            }
        } else {
            setLoading(false);
            setFormData(initialValues);
            setOriginData(initialValues);
        }
    }, [dialogState.process, selectedRow]);

    return (
        <StyledContainer>
            {!loading ? (
                <Formik
                    innerRef={editAssetGroupFormRef}
                    enableReinitialize={true}
                    initialValues={formData}
                    onSubmit={() => {
                        console.log("submit");
                    }}
                >
                    {({ values, setFieldValue }: FormikProps<EditAssetGroupFormValues>) => {
                        return (
                            <Form>
                                <StyledLayoutHeader>
                                    <Stack>
                                        <Button onClick={handleCloseBtnClick}>
                                            <MdOutlineArrowForwardIos />
                                        </Button>
                                        <span>자원종류 {selectedRow ? "(수정)" : "(등록)"}</span>
                                    </Stack>
                                </StyledLayoutHeader>
                                <StyledDescription>
                                    ※ 자원종류명과 속성항목의 항목이름은 추후에 수정이 가능하지만 나머지는 모두 수정이
                                    불가능합니다.
                                </StyledDescription>
                                <StyledLayoutBodyWithHeaderFooter>
                                    <FormCollection
                                        values={values}
                                        originData={originData}
                                        setFieldValue={setFieldValue}
                                        selectedRow={selectedRow}
                                    />
                                </StyledLayoutBodyWithHeaderFooter>
                                <StyledLayoutFooter>
                                    <StyledSmButton type="submit">{selectedRow ? "수정" : "등록"}</StyledSmButton>
                                </StyledLayoutFooter>
                            </Form>
                        );
                    }}
                </Formik>
            ) : (
                <StyledLoadingWrap>
                    <LoadingSpinner />
                </StyledLoadingWrap>
            )}
        </StyledContainer>
    );
};

const StyledLoadingWrap = styled.div`
    position: absolute;
    top: 80px;
    left: 16px;
    width: calc(100% - 32px);
    height: calc(100% - 75px);
`;

const StyledContainer = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 200px);
`;

const StyledDescription = styled.div`
    padding: 15px;
    font-size: 13px;
    color: #9a9a9a;
`;

export default EditFormPage;
