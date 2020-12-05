<?php if (! defined('BASEPATH')) {
    exit('No direct script access allowed');
}
require APPPATH . '/libraries/REST_Controller.php';

class Services extends REST_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('services_model');
    }

    public function addinternet_post()
    {

        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addinternet($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addgps_post()
    {

        //$this->response($this->post('service'));

        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addgps($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addaccescontrol_post()
    {

        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addaccescontrol($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addsmartpanic_post()
    {
        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addsmartpanic($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addalarm_post()
    {

        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addalarm($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addcamera_post()
    {
        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addcamera($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addtotem_post()
    {
        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product = $this->services_model->addtotem($this->post('service'));

        if ($product == 1) {
            $this->response(['response' => "Registro exitoso"], 200);
        } else {
            if ($product == 0) {
                $this->response(['error' => "ERROR INESPERADO"], 500);
            } else {
                if ($product == 2) {
                    $this->response(['response' => "Elemento ya se encuentra registrado"], 203);
                }
            }
        }
    }

    public function addlicencia_post() {

        $product = null;
        if (! $this->post('service')) {
            $this->response(null, 404);
        }

        $product= json_decode($this->services_model->insertLicence($this->post('service')));

        if ($product->res == 1) {
            $this->response(
                [
                    'response'        => "Registro exitoso",
                    'idUserLinceseFk' => $product->id,
                ],
                200);
        } else {
            if ($product->res == 0) {
                $this->response([ 'error' => "ERROR INESPERADO" ], 500);
            } else {
                if ($product->res == 2) {
                    $this->response([ 'response' => "Elemento ya se encuentra registrado" ], 203);
                }
            }
        }
    }
    /*
    public function update_post() {

        $rs = $this->product_model->update($this->post('product'));

        if (!is_null($rs)) {
            $this->response("Actualizado", 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function delete_delete($id) {

        $rs = $this->product_model->delete($id);
        if (!is_null($rs)) {
            $this->response("Eliminado", 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function find_get($id) {
        if (!$id) {
            $this->response(NULL, 404);
        }

        $rs = null;
        $rs = $this->product_model->get($id);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }

    public function search_post() {

        $searchFilter = $this->post('filter');


        $rs = $this->product_model->get(null, $searchFilter);

        if (!is_null($rs)) {
            $this->response($rs, 200);
        } else {
            $this->response(array('error' => 'NO HAY RESULTADOS'), 404);
        }
    }*/
    public function servicesPorIdContrato_get($idContrato) {
        $service = null;
        $service = $this->services_model->getServicesPorIdContrato($idContrato);

        if (! is_null($service)) {
            $this->response($service, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }

    public function typeOfServices_get() {
        $service = null;
        $service = $this->services_model->getTypeOfServices();

        if (! is_null($service)) {
            $this->response($service, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }

    public function accessCtrlDoors_get() {
        $service = null;
        $service = $this->services_model->accessCtrlDoors();

        if (! is_null($service)) {
            $this->response($service, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }

    public function getPorIdContrato_get($idContrato) {
        if (!$idContrato) {
            $this->response(NULL, 404);
        }
        $service = $this->services_model->getPorIdContrato($idContrato);

        if (! is_null($service)) {
            $this->response($service, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }

    public function getServicesPorIdCliente_get($idClientFk) {
        if (!$idClientFk) {
            $this->response(NULL, 404);
        }
        $service = $this->services_model->getServicesPorIdCliente($idClientFk);

        if (! is_null($service)) {
            $this->response($service, 200);
        } else {
            $this->response([ 'error' => 'NO HAY RESULTADOS' ], 404);
        }
    }
}

?>