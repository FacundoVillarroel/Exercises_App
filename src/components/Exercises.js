import React, {useEffect, useState} from 'react';
import { Pagination } from '@mui/material';
import { Box, Stack, Typography } from '@mui/material';

import { excersiceOptions,fetchData } from '../utils/fetchData';
import ExerciseCard from "./ExerciseCard"

const Exercises = ({exercises, setExercises, bodyPart}) => {
  const [currentPage,setCurrentPage] = useState(1)
  const [exercisesPerPage, setExercisesPerPage] = useState(9)

  const indexOfLastExercise= currentPage* exercisesPerPage;
  const indexOfFirstExercise= indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise)

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({top:1800, behavior:"smooth"})
  }

  useEffect(() => {
    if(window.screen.width <= 1080 ) setExercisesPerPage(6)
    const fetchExercisesData = async() =>{
      let exercisesData = [];

      if(bodyPart === "all"){
        exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", excersiceOptions);
      } else{
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, excersiceOptions);
      }

      setExercises(exercisesData);
    }

    fetchExercisesData();
  },[bodyPart, exercisesPerPage, setExercises])

  return (
    <Box id="exercises"
      sx={{mt:{lg:"110px"}}}
      mt="50px"
      p="20px"
    >
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: {lg:"110px", xs:" 50px"}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise}/>
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center">
          {exercises.length > 9 && (
            <Pagination
              color="standard"
              shape="rounded"
              defaultPage={1}
              count={Math.ceil(exercises.length / exercisesPerPage)}
              page= {currentPage}
              onChange={paginate}
              size="large"
            />
          )}
      </Stack>
    </Box>
  )
}

export default Exercises