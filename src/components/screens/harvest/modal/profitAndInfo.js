import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { BootstrapDialog, BootstrapDialogTitle } from '../../../ourComponents/Modals';
import { DialogContent } from '@mui/material';
import { InfoHarvest } from './subTabs/info';
import { Financial } from './subTabs/financial';
import { Profit } from './subTabs/profit';
import { differenceInDays, parseISO } from 'date-fns';

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const TabsModal = ({ openModal, setOpenModal, isEdit, refetchTableData }) => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);

    const [isSelected, setIsSelected] = useState({
        info: false,
        profit: false,
        financial: false,
        days: {
            periodo: "",
            lucro_dia: "",
            lucro_total: ""
        }
    })

    const handleChange = (event, newValue) => {
        let daysDifference = "";
        let profit_day = "";
        let total = "";

        if (newValue === 2) {
            const parsedDate1 = parseISO(isEdit?.valuesProfit?.data.getAllProfit[0].periodo_venda);
            const parsedDate2 = parseISO(isEdit?.valuesEdit?.data_safra);

            daysDifference = Math.abs(differenceInDays(parsedDate2, parsedDate1));
            profit_day = (
                ((
                    isEdit?.valuesProfit?.data.getAllProfit[0].qtd_venda *
                    isEdit?.valuesProfit?.data.getAllProfit[0].valor_venda
                ) - (
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial +
                        (
                            (
                                isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalho *
                                isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalhada
                            ) * (
                                (
                                    daysDifference
                                )
                            )
                        )
                    )) / (
                    daysDifference
                )
            ).toFixed(2).toString().replace('.', ',')
            total = (
                (
                    isEdit?.valuesProfit?.data.getAllProfit[0].qtd_venda *
                    isEdit?.valuesProfit?.data.getAllProfit[0].valor_venda
                ) - (
                    isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_adubo +
                    isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_calcario +
                    isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.preco_insumos +
                    isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.valor_inicial +
                    (
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalho *
                        isEdit?.valuesExpense.data.getAllHarvestExpense[0]?.hora_trabalhada
                    ) * (
                        daysDifference
                    )
                )
            ).toFixed(2).toString().replace('.', ',')
        }

        setValue(newValue);
        setIsSelected({
            info: newValue === 0 ? true : false,
            financial: newValue === 1 ? true : false,
            profit: newValue === 2 ? true : false,
            days: {
                periodo: daysDifference ?? "",
                lucro_dia: profit_day ?? "",
                lucro_total: total 
            }
        })
    };

    useEffect(() => {
        if (openModal.modalInfo) {
            setOpen(true);
        }
    }, [openModal.modalInfo]);

    const handleClose = async () => {
        await setOpen(false);
        setTimeout(() => {
            setOpenModal({
                ...openModal,
                modalInfo: false
            })
        }, 1000);
    };

    return (
        <BootstrapDialog open={open} fullWidth={true} maxWidth="lg" >
            <BootstrapDialogTitle
                id="customized-dialog-title"
                onClose={handleClose}
                sx={{
                    bgcolor: "#da8f73",
                    color: "white"
                }}
            >
                <Box
                    sx={{
                        display: "inline-flex"
                    }}
                >
                    <Typography
                        fontSize="1em"
                    >
                        Opções de Safra
                    </Typography>
                </Box>
            </BootstrapDialogTitle>
            <DialogContent>
                <Box sx={{ width: '100%', mt: 4 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            textColor="inherit"
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#da8f73',
                                },
                            }}
                        >
                            <Tab label="Dados gerais da safra" {...a11yProps(0)} />
                            <Tab label="Receitas e Despesas" {...a11yProps(1)} />
                            <Tab
                                label="Análise de lucro"
                                {...a11yProps(2)}
                                disabled={isEdit?.valuesProfit?.data?.getAllProfit?.length > 0 ? false : true}
                            />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <InfoHarvest
                            isSelected={isSelected.info}
                            isEdit={isEdit?.valuesEdit}
                            handleClose={handleClose}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Financial
                            isSelected={isSelected.financial}
                            isEdit={isEdit?.valuesEdit}
                            valuesExpense={isEdit?.valuesExpense}
                            valuesProfit={isEdit?.valuesProfit}
                            refetchTableData={refetchTableData}
                            handleClose={handleClose}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel
                        value={value} index={2}
                    >
                        <Profit
                            handleClose={handleClose}
                            isEdit={isSelected}
                        />
                    </CustomTabPanel>
                </Box>
            </DialogContent>
        </BootstrapDialog>
    );
}