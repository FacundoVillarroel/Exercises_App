import React, {useState, useEffect} from 'react';
import {Box,Button,Stack,TextField, Typography} from "@mui/material";

import { excersiceOptions, fetchData } from '../utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({setExercises, bodyPart, setBodyPart}) => {
  const [search, setSearch] = useState ("");
  const [bodyParts, setBodyParts] = useState([])

  useEffect(() =>{
    const fetchExercisesData = async() => {
      const bodyPartsData = await fetchData("https://exercisedb.p.rapidapi.com/exercises/bodyPartList", excersiceOptions);

      setBodyParts(["all", ...bodyPartsData])
    }

    fetchExercisesData();
  }, [])

  const handleSearch = async() => {
    if(search){
      const exercisesData = await fetchData("https://exercisedb.p.rapidapi.com/exercises", excersiceOptions);

      const searchedExercises= exercisesData.filter (
        (exercise) => exercise.name.toLowerCase().includes(search.toLowerCase())
        || exercise.target.toLowerCase().includes(search.toLowerCase())
        || exercise.equipment.toLowerCase().includes(search.toLowerCase())
        || exercise.bodyPart.toLowerCase().includes(search.toLowerCase())
      )
      
      setSearch("");
      setExercises(searchedExercises);
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight="700"
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Awesome Exercises You <br /> Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: {
              fontWeight: "700",
              border: "none",
              borderRadius: "4px",
            },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          heigth="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Exercises"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#FF2625",
            color: "#FFF",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: " 100%", p: "20px" }}>
        <HorizontalScrollbar
          data={bodyParts}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          isBodyParts
        />
      </Box>
    </Stack>
  );
}

export default SearchExercises