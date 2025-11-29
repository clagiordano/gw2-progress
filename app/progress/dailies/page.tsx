"use client";

import { useEffect, useState } from "react";
import {
  Achievement,
  Category,
  Group,
  Progress,
} from "@/models/achievement";
import {
  ListItem,
  UnorderedList,
  Text,
  ListIcon,
  Image,
  Heading,
  Skeleton,
  Box,
  useTheme,
  useColorModeValue,
  SkeletonText,
  SimpleGrid,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  getAchievementByIds,
  getAchievementsCategoriesByIds,
  getAchievementsGroupsById,
  getUserProgression,
} from "@/services/achievements";

export default function Dailies() {
  const [dailies, setDailies] = useState<Group | null>(null);
  const [isDailiesLoading, setDailiesLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  const [achievements, setAchievements] = useState<
    Record<string, Achievement[]>
  >({});
  const [achievementsLoading, setAchievementsLoading] = useState<
    Record<string, boolean>
  >({});
  const [userProgression, setUserProgression] = useState<Progress[]>([]);
  const dailiesId = "18DB115A-8637-4290-A636-821362A3C4A8";
  const theme = useTheme();

  const primaryText = useColorModeValue(theme.colors.textPrimary.light, theme.colors.textPrimary.dark);
  const secondaryText = useColorModeValue(theme.colors.textSecondary.light, theme.colors.textSecondary.dark);

  useEffect(() => {
    getAchievementsGroupsById(dailiesId).then(
      (data) => {
        setDailies(data);
        setDailiesLoading(false);
        console.log("Dailies group data:", data);
      }
    );
  }, []);

  useEffect(() => {
    getUserProgression().then((data) => {
      setUserProgression(data);
    });
  }, []);

  useEffect(() => {
    if (dailies) {
      getAchievementsCategoriesByIds(dailies.categories.join(",")).then(
        (data) => {
          setCategories(data);
          setCategoriesLoading(false);
          console.log("Dailies categories data:", data);
        }
      );
    }
  }, [dailies]);

  useEffect(() => {
    categories.forEach((cat: Category) => {
      if (cat.achievements.length === 0) return;

      // Set loading ON for this category
      setAchievementsLoading((prev) => ({ ...prev, [cat.id]: true }));

      getAchievementByIds(cat.achievements.join(",")).then((data) => {
        setAchievements((prev) => ({ ...prev, [cat.id]: data }));
        setAchievementsLoading((prev) => ({ ...prev, [cat.id]: false }));
      });
    });
  }, [categories]);

  // Derived achievements with done status (recommended by React)
  const achievementsWithDone: Record<string, Achievement[]> = Object.fromEntries(
    Object.entries(achievements).map(([cid, list]) => {
      const updated = list.map((ach) => {
        const found = userProgression.find((p) => p.id === ach.id);
        return {
          ...ach,
          done: found ? !!found.done : false,
        };
      });
      return [cid, updated];
    })
  );
  console.log(achievementsWithDone);
  return (
    <div>
      {dailies && (
        <Heading size="lg" as="h1" mb={2}>
          <SkeletonText isLoaded={!isDailiesLoading} noOfLines={1}>
            {dailies.description}
          </SkeletonText>
        </Heading>
      )}

      <Skeleton isLoaded={!isCategoriesLoading}>
        {categories.map((cat) => (
          <Box key={`cont_${cat.id}`} p={2} mb={2}>
            <Box flex="1" minW={0}>
              {/* Name */}
              <Text fontSize="lg" fontWeight="semibold" color={primaryText} noOfLines={1}>
                {cat?.name}
              </Text>

              {/* Description */}
              {cat?.description && (
              <Text fontSize="md" fontStyle="italic" color={secondaryText} noOfLines={2}>
                {cat?.description}
              </Text>)}
            </Box>

            <Skeleton isLoaded={!achievementsLoading[cat.id]}>
              {/* <UnorderedList mb={6}> */}
              <SimpleGrid minChildWidth="300px" spacing={1} borderWidth="1px"
                     borderRadius="md" >
                {achievementsWithDone[cat.id]?.map((achi) => (
                  // <ListItem key={achi.id}>
                  //   <ListIcon
                  //     as={CheckCircleIcon}
                  //     color={achi.done ? "green.500" : "gray.500"}
                  //   />
                  //   {achi.name}: {achi.description}
                  // </ListItem>
                  <Box
                    key={achi.id}
                    p={1}
                    // borderWidth="1px"
                    // borderRadius="md"
                    // cursor="pointer"
                    // bg={bg}
                    // _hover={{ bg: hoverBg }}
                    // onClick={() => openDetails(achievement)}
                  >
                  <Flex align="center">
                    {/* {achi.icon && (
                      <Image
                        borderRadius="full"
                        boxSize="28px"
                        src={achi.icon}
                        alt={achi.name}
                      />
                    )} */}
                    <Box flex="1" minW={0} _hover={{ bg: "gray" }} borderRadius="full" p={1}>
                      <Text fontWeight="semibold" noOfLines={1}>
                        <Icon as={CheckCircleIcon} color={achi.done ? "green.500" : "gray.500"} mr={2} />
                        {achi.name}
                      </Text>
                    </Box>
                  </Flex>
                  </Box>
                ))}
                </SimpleGrid>
              {/* </UnorderedList> */}
            </Skeleton>
          </Box>
        ))}
      </Skeleton>
    </div>
  );
}
