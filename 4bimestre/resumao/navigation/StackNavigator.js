import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase/firebase';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import CatalogoFilmes from '../screens/CatalogoFilmes';
import EditarFilme from '../screens/EditarFilme';
import CriarFilme from '../screens/CriarFilme';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [usuario, setUsuario] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return unsubscribe;
  }, []);

  if (usuario === undefined) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          <>
            <Stack.Screen
              name="Catalogo"
              component={CatalogoFilmes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EditarFilme"
              component={EditarFilme}
              options={{ title: 'Editar Filme' }}
            />
            <Stack.Screen
              name="CriarFilme"
              component={CriarFilme}
              options={{ title: 'Adicionar Filme' }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Cadastro" component={Cadastro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
