<?php

namespace App\Exports;

use App\Models\Usuarios;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromArray;

class PollizasUsersxport implements FromArray
{
    //FromCollection, WithHeadings,
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $data;

    public function __construct(array $data)
    {
        $this->data = $data;
    }

    public function array(): array
    {
        return $this->data;
    }
    /*public function headings(): array
    {
        return [
            'Id',
            'Nombre',
            'Email',
        ];
    }
    public function collection()
    {
        return Usuarios::all();
    }*/

}
