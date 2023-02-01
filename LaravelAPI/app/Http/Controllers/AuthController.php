<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Http;

use Illuminate\Support\Facades\Auth;
use App\Models\Usuarios;
use App\Models\Polizas;
use Validator;


class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'publicRegister']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $credentials = [
            'email' => $request->get('username'),
            'password' => $request->get('password')
        ];

        $validator = Validator::make($credentials, [
            'email' => 'required|string|min:6',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails()) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => $validator->errors()
            ], 422);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Unauthorized"
            ], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        dd('asd');
        $validator = Validator::make($request->all(), [
        
        'email' => 'required|string|between:2,100',
        'contrasena' => 'required|string|confirmed|min:6',
        'rol' => 'required|string',
        'es_activo' => 'required|integer',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = Usuarios::create(array_merge(
            $validator->validated(),
            ['contrasena' => bcrypt($request->contrasena)]
        ));
        return response([
            'status' => 'success',
            'code' => 1,
            'message' => "Usuario registrado",
            'data' => $user
        ], 201);
    }

       /**
     * Register a User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function publicRegister(Request $request)
    {
        $validator = Validator::make($request->all(), [        
        'email' => 'required|string|between:2,100',     
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $usuario = Usuarios::where('email', $request->email)->first();
        if($usuario != null){            
             $userId = $usuario->id;
        }else{
            $usuario = Usuarios::create(array_merge(
                $validator->validated(),
                ['contrasena' => bcrypt('password'),
                'rol' => 'Cliente',
                'celular' => $request->celular]
            ));
            $userId = $usuario->id;
        }
        $response = Http::post('http://62.171.180.230:8009/sendOrder', [
            'name' => $request->name,
            'email' => $request->email,
            'password' => $request->contrasena,
            'phone_number' => $request->celular,
        ]);

        
        $polizas = Polizas::create(['valor' => 34,
                                    'fecha_vigencia' => '2025-10-10',
                                    'paquete_id' => 1,
                                    'auto_id' => 1,
                                    'user_id' => $userId,
                                    'estado' => "Pendiente",
                                    ]);
    
        return response([
            'status' => 'success',
            'code' => 1,
            'message' => "Usuario registrado",
            'data' => "Enviado"
        ], 201);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        try {
            return response([
                'status' => 'success',
                'code' => 1,
                'message' => "Token Generated",
                'data' => auth()->user()
            ], 200);
        } catch (\Exception $exception) {
            return response([
                'status' => 'error',
                'code' => 0,
                'message' => "Failed to get user profile. {$exception->getMessage()}"
            ], 500);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response([
            'status' => 'success',
            'code' => 1,
            'message' => "Token Generated",
            'data' => [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60 * 60 * 60,
                'user' => auth()->user()
            ]
        ], 200);
    }
}



