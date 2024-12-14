import React, { useState } from "react";
import {
  Text,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Box,
  Icon,
  HStack,
  ScrollView,
  Image,
  Pressable,
  Input,
  Button,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const theme = extendTheme({
  config,
  colors: {
    primary: {
      50: "#edf2f7",
      100: "#dbe2ea",
      200: "#b9c5d2",
      300: "#94a7bb",
      400: "#728aa3",
      500: "#4a6686",
      600: "#3a506b",
      700: "#1B1833",
      800: "#1e2c41",
      900: "#121d2e",
    },
    accent: {
      500: "#F0BB78",
    },
  },
});

const batikData = [
  {
    id: "1",
    name: "BATIK SOLO SLIM FIT PRIA ",
    description: "Batik khas Solo Kemeja model slimfit mengikuti bentuk tubuh tanpa saku/kantong dengan paduan warna dan motif kekinian sehingga terlihat keren dan rapi.",
    image: "https://s1.bukalapak.com/img/15529137103/s-400-400/data.jpeg.webp",
  },
  {
    id: "2",
    name: "BATIK SOLO TERBARU - HEM LENGAN PANJANG - BCL",
    description: "Batik dengan motif Kemeja model slimfit mengikuti bentuk tubuh tanpa saku/kantong dengan paduan warna dan motif kekinian sehingga terlihat keren dan rapi.",
    image: "https://s1.bukalapak.com/img/17925305992/s-400-400/data.jpeg.webp",
  },
  {
    id: "3",
    name: "BATIK SOLO PRIA HEM LENGAN PANJANG BCL406",
    description: "Batik klasik Pola baju, cutting bahan, dan proses jahit kami lakukan di konveksi kami sehingga dapat menghasilkan produk murah dan berkualitas bagus.",
    image: "https://s1.bukalapak.com/img/11809107892/large/data.jpeg.webp",
  },
];

const Stack = createStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

function HomeScreen({ navigation }) {
  const [searchText, setSearchText] = useState("");

  const filteredBatik = batikData.filter((batik) =>
    batik.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Center _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }} flex={1}>
      <HStack px={4} py={3} bg="accent.500" alignItems="center" justifyContent="space-between" w="100%">
        <Icon as={MaterialIcons} name="menu" size="lg" color="white" />
        <Heading color="white" size="md">Batik Khas Solo</Heading>
        <Icon as={MaterialIcons} name="shopping-cart" size="lg" color="white" />
      </HStack>

      <Input
        placeholder="Cari batik"
        variant="filled"
        width="90%"
        borderRadius="10"
        py="1"
        px="2"
        my="4"
        InputLeftElement={<Icon as={MaterialIcons} name="search" size="sm" ml="2" color="gray.400" />}
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />

      <ScrollView flex={1} w="100%">
        {filteredBatik.map((item) => (
          <Box
            key={item.id}
            flexDirection="row"
            bg="primary.800"
            _light={{ bg: "primary.100" }}
            borderRadius="md"
            shadow={2}
            mx={4}
            my={2}
            p={3}
          >
            <Image
              source={{ uri: item.image }}
              alt={item.name}
              size="xl"
              borderRadius="md"
            />

            <VStack ml={3} flex={1} justifyContent="space-between">
              <Pressable onPress={() => navigation.navigate('Details', { item })}>
                <Heading size="sm" color="white" _light={{ color: "primary.900" }}>
                  {item.name}
                </Heading>
              </Pressable>
              <Text color="primary.200" fontSize="xs" mt={1}>{item.description}</Text>
              <Button
                mt={2}
                bg="accent.500"
                _pressed={{ bg: "accent.700" }}
                onPress={() => alert(`Batik ${item.name} telah ditambahkan ke keranjang!`)}
              >
                Tambahkan ke Keranjang
              </Button>
            </VStack>
          </Box>
        ))}
      </ScrollView>

      <ToggleDarkMode />
    </Center>
  );
}

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <Center flex={1} _dark={{ bg: "primary.900" }} _light={{ bg: "primary.50" }}>
      <VStack space={4} alignItems="center">
        <Image source={{ uri: item.image }} alt={item.name} size="2xl" borderRadius="md" />
        <Heading color="primary.800" _light={{ color: "primary.900" }}>{item.name}</Heading>
        <Text>{item.description}</Text>
        <Button
          mt={4}
          bg="accent.500"
          _pressed={{ bg: "accent.700" }}
          onPress={() => alert(`Anda membeli Batik ${item.name}!`)}
        >
          Beli Sekarang
        </Button>
      </VStack>
    </Center>
  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={4} alignItems="center" py={4}>
      <Text color="primary.500">Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
        offTrackColor="primary.600"
        onTrackColor="accent.500"
        onThumbColor="white"
      />
      <Text color="primary.500">Light</Text>
    </HStack>
  );
}
