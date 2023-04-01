import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { useTranslation } from "react-i18next";

import { alpha, styled } from '@mui/material/styles';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { TextFieldProps } from '@mui/material/TextField';

import { actions } from '../../features/goods';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';

export const AddGoods = () => {
  const { t } = useTranslation();
  const [good, SetGood] = React.useState('');
  const [autor, SetAutor] = React.useState('');
  const [year, SetYear] = React.useState('');
  const [rate, SetRate] = React.useState('');
  const [alerton, SetAlerton] = React.useState(false);
  const [alerton1, SetAlerton1] = React.useState(false);
  const [disableButton, SetDisableButton] = React.useState(true);
  const [mail, SetMail] = React.useState(false);

  const dispatch = useDispatch();
  const data = useAppSelector(state => state.goods || []);

  const handleAddGood = () => {
    const index: number = Math.max(...data.map(good => Object(good).id)) + 1;

    dispatch(actions.addGoods([...data, { "id": index, "description": autor, "rating": rate, "title": good }]));

    nulli(index);
  }

  function nulli (index: number) {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: good,
        id: index,
        description: autor,
        rating: rate
      })
    })
      .then(res => res.json())
      .then(
      // () => dispatch(actions.addGoods([...data, { "id": index, "description": autor, "rating": rate, "title": good }])),
      // () => nulli()
    )
    // .then(console.log);

    SetAlerton1(true);

    setTimeout(() => {
      SetGood('');
      SetAutor('');
      SetYear('');
      SetRate('');
    }, 1000)
  }



  React.useEffect(() => {
    if(mail && rate !== '' && year !== '' && autor !== '' && good !== '') {
      SetDisableButton(false);
    } else {
      SetDisableButton(true);
      setTimeout(() => {
        SetAlerton1(false);
      }, 2000)
    }
  }, [mail, rate, year, autor, good])

  const handleChange = (par: string, event: string) => {
    switch(par) {
      case 'good':
        SetGood(event);
        break;

      case 'autor':
        SetAutor(event);
        break;

      case 'year':
        SetYear(event);
        break;

      case 'rate':
        if(event.match(/[a-zA-Zа-яА-Я]/) || isNaN(+event)) {
          SetAlerton(true);

          setTimeout(() => {
            SetAlerton(false);
          }, 5000)

          break
        }

        if(+event > 5) {
          SetRate(Number(5).toFixed(2));
        } else {
          SetRate(Number(event).toFixed(2));
        }
        break;

      default:
        break;
    }
  }

  const RedditTextField = styled((props: TextFieldProps) => (
    <TextField
      InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid #e2e2e1',
      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  return (
    <Container maxWidth="sm">
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
          border: '1px solid black',
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '10px 0 0 0'
        }}
        noValidate
        autoComplete="off"
      >

        <TextField
          id="outlined-basic"
          label={t('AdderGoods').split('*')[0]}
          value={good}
          onChange={(e) => handleChange('good', e.target.value)}
          variant="outlined"
          required
        />

        <TextField
          required
          id="outlined-basic"
          label={t('AdderGoods').split('*')[1]}
          variant="outlined"
          value={autor}
          onChange={(e) => handleChange('autor', e.target.value)}
        />

        <RedditTextField
          required
          label={t('AdderGoods').split('*')[2]}
          type='date'
          value={year}
          id="reddit-input"
          onChange={(e) => handleChange('year', e.target.value)}
          variant="filled"
          style={{ marginTop: 4, padding: '4px' }}
        />


        <TextField
          required
          id="outlined-basic"
          label={t('AdderGoods').split('*')[3]}
          variant="outlined"
          onChange={(e) => handleChange('rate', e.target.value)}
          value={rate}
        />

        <div>
          <Formik
            initialValues={{ email: '' }}
            validate={values => {
              const errors = {};
              if(!values.email) {
                SetAlerton(true);
                SetMail(false);
              } else if(
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                SetAlerton(true);
                SetMail(false);

              } else {
                SetAlerton(false);
                SetMail(true);
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  style={{
                    width: '93%',
                    height: '55px',
                    border: '1px solid grey',
                    borderRadius: '5px',
                    padding: '0 0 0 15px'

                  }}
                  placeholder='Email'
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {errors.email && touched.email && errors.email}

                <Button
                  disabled={disableButton}
                  // type='submit'
                  sx={{ m: '15px 0 0 0', width: '100%', height: '3.65em' }}
                  variant='outlined'
                  onClick={handleAddGood}
                >
                  {t('AdderGoods').split('*')[4]}
                </Button>
              </form>
            )}
          </Formik>
        </div>

        {
          alerton && <Alert severity="error">Check the data</Alert>
        }

        {
          alerton1 && <Alert severity="success">Good added!!!</Alert>
        }
      </Box>
    </Container>


  );
};
