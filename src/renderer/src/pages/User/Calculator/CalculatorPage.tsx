import { FC, useState } from "react";
import { 
    Container,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Typography,
    TextField,
    Box,
    Button
} from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { materialsConfig, IMaterial } from "../../../config/calculator.config";
import { ICalculatorFields } from "./calculator.types"

const CalculatorPage: FC = () => {
   // const [chosenMaterial, setChosenMaterial] = useState<IMaterial>(materialsConfig[0]);
    const [selectValue, setSelectValue] = useState<string>(materialsConfig[0].name);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const { register, handleSubmit, formState: { errors } } 
    = useForm<ICalculatorFields>({
        mode: "onChange"
    });

    const handleCalculate: SubmitHandler<ICalculatorFields> = (data) => {
        console.log(data)
        const material = materialsConfig.find(({name}) => 
                name == data.material.name
            ) || materialsConfig[0]
        setTotalPrice(
            material.price * Number(data.price)
        )
    }

    return (
        <Container sx={{
            marginTop: "50px"
        }}>
            <Typography variant="h1">
                Калькулятор
            </Typography>
            <Paper sx={{
                padding: "10px"
            }}>
                <Box
                 component={"form"}
                 onSubmit={handleSubmit(handleCalculate)}
                 sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px"
                 }}
                 >
                    <InputLabel id="calculator-matelial-label">
                        Материал
                    </InputLabel>
                    <Select
                    labelId="calculator-matelial-label"
                    id="calculator-matelial-select"
                    label="Материал"
                    value={selectValue}
                    {...register("material.name", {
                        required: "Материал - обязательное поле",
                        onChange(event) {
                            setSelectValue(event.target.value)
                        },
                    })}
                    >
                        {
                            materialsConfig.map(({name}) => 
                                <MenuItem key={name} value={name}>
                                    {
                                        name
                                    }
                                </MenuItem>
                            )
                        }
                    </Select>
                    <TextField
                        label="Количесво грамм"
                        {...register("price", {
                            required: "Цена - обязательное поле",
                            pattern: {
                                value: /^[1-9][0-9]*(?:\.[0-9]+)?/,
                                message: "Некорректное значение"
                            }
                        })}
                        error={Boolean(errors.price?.message)}
                        helperText={errors.price?.message}
                    >
                    </TextField>
                    <Button type="submit" variant="contained">
                        Расчитать
                </Button>
                </Box>
                
            </Paper>
            {
                    Boolean(totalPrice) && 
                    <Typography variant="h4">
                        Итоговая цена: {Math.round(totalPrice)}₽
                    </Typography>
                }
        </Container>
    );
};

export { CalculatorPage };
