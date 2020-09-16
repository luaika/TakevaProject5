<?php

namespace App\Http\Controllers;

use App\Ruta;
use App\Barrio;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RutaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

    switch($_GET['Q']){

        case 0:
            $lista = Ruta::join('barrio', 'barrio.idBarrio', 'ruta.idBarrioInicia')
            ->select('ruta.*' , 'barrio.nombreBarrio as barrio_inicia')
            ->get();
            return response()->json($lista);
            
        case 1:
            $query = Ruta::where([
            ['estado', 1],
            ])->orderBy('descripcion')->get();
            return response()->json($query);
            
        case 2:
            $btermina = Barrio::join('ruta', 'ruta.idBarrioTermina', 'barrio.idBarrio')
            ->select('barrio.nombreBarrio' , 'barrio.nombreBarrio as barrio_termina')
            ->get();
            return response()->json($btermina);
        break;
    }


      //return response()->json(Ruta::all()) ;

    }

    /* public function rutaFinal()
    {
        $destino = Ruta::join('barrio', 'barrio.idBarrio', 'ruta.idBarrioTermina')
                    ->select('ruta.idBarrioTermina' , 'barrio.descripcion as barrio_termina')
                ->get();
                return response()->json($destino);
    }
 */
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $ruta = Ruta::create([

            'codigo' => $request->codigo,
            'descripcion' => $request->descripcion,
            'idBarrioInicia' => $request->idBarrioInicia,
            'idBarrioTermina' => $request->idBarrioTermina,
            'estado' => $request->estado,
            'idUsuarioModifica' => $request->idUsuarioModifica,
            'idUsuarioCrea' => $request->idUsuarioCrea
            ]);

         return response()->json($ruta);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
