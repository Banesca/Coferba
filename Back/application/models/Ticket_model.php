<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ticket_model extends CI_Model
{
	
	public function __construct()
	{
        parent::__construct();
         /*MAIL*/ $this->load->model('mail_model');
	}


private function formatCode($value) {
        $CODE = sprintf("%08d", $value);
        return $CODE;
    }

    public function add($ticket) {




    	 /* BUSCVAMOS UN CODIGO PARA ASIGNARLO */
    	 $codTicket ="";
    	 $getCodeSys = null;
            $query = $this->db->select("*")->from("tb_sys_code")
            ->where("idCode =", 1)->get();


            if ($query->num_rows() > 0) {
                $getCodeSys = $query->row_array();
                $codTicket = $getCodeSys['description'] . "-" .
                $this->formatCode($getCodeSys['code'] + 1);
            }

            $this->db->set(
                    array(
                        'code' => $getCodeSys['code'] + 1
                    )
            )->where("idCode =", 1)->update("tb_sys_code");

        /* CREAMOS UN TICKET */
        $this->db->insert('tb_tickets', array(
            'codTicket' => $codTicket,
            'idTypeTicketKf' => @$ticket['idTypeTicketKf'],
            'idTenantKf' => @$ticket['idTenantKf'],
            'numberItemes' => @$ticket['numberItemes'],
			'numberItemDisabled' => @$ticket['numberItemDisabled'],
			'idReasonDisabledItemKf' => @$ticket['idReasonDisabledItemKf'],

            'idTypeDeliveryKf' => @$ticket['idTypeDeliveryKf'],
			'description' => @$ticket['description'],
			'idUserEnterpriceKf' => @$ticket['idUserEnterpriceKf'],
			'idTypeOuther' => @$ticket['idTypeOuther'],
			'mailContactConsult'  => @$ticket['mailContactConsult'],
			'idUserCompany'  =>  @$ticket['idUserCompany'],
			'idOWnerKf'  => @$ticket['idOWnerKf'],
			'idUserAdminKf'  => @$ticket['idUserAdminKf'],
			'descriptionOrder' => @$ticket['descriptionOrder'],
			'idTypeServicesKf'  => @$ticket['idTypeServicesKf'],

			'addressConsul'=> @$ticket['addressConsul'],
			'idProfileKf' => @$ticket['idProfileKf']

		)
        );



        

        if ($this->db->affected_rows() === 1) {
            $idTicketKf = $this->db->insert_id();

            
        

            if(count(@$ticket['list_id_clients']) > 0)///para admnistradores
            {
            	foreach ($ticket['list_id_clients'] as $valor) {
				    
				    $this->db->insert('tb_clients_tickets', array(
		            'idTicketKf' => $idTicketKf,
		            'idClientKf' => $valor
				));
				}
            }


            $to = "";
            
            $idUser = 0;
            if(@$ticket['idUserEnterpriceKf'] > 0){
                $idUser =  @$ticket['idUserEnterpriceKf'];
             }

             if(@$ticket['idUserEnterpriceKf'] >0 ){
                $idUser =  @$ticket['idUserEnterpriceKf'];
             }

             if(@$ticket['idTenantKf'] > 0){
                $to['emailUser'] =  @$ticket['emailTenant'];
             }

        if($idUser >0){
            $query =  $this->db->select("*")->from("tb_user")->where("idUser =", @$idUser)->get();
            if ($query->num_rows() > 0) {
                $to = $query->row_array();
            }
        }

        //echo $to['emailUser'];

            if($to != ""){
                    
                    /*MAIL*/
                    $title ="Nuevo Ticket Coferba (".$codTicket.")";
                    $body ="Tienes un Ticket que fue Recibido por Coferba, pronto Procesaran tu Solicitud!";
                    $this->mail_model->sendMail($title,$to['emailUser'],$body);
                
            }
        
           

            return true;
        } else {
            return null;
        }
    }



     // GET DE LISTADO BUSQUEDA DE INQUIILINO //
    public function get($id = null, $searchFilter = null) {
        $quuery = null;
        $rs = null;

        // SI RECIBIMOS EL ID DE EL USUARIO //
        if (!is_null($id)) 
        {

            $this->db->select("*")->from("tb_tickets");
            $this->db->join('tb_tenant', 'tb_tenant.idTenant = tb_tickets.idTenantKf', 'left');
            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeKf', 'left');
			$this->db->where("tb_tenant.idStatusTicketKf !=", -1);
            $quuery = $this->db->where("tb_tenant.idTenant = ", $id)->get();


            if ($quuery->num_rows() === 1) {
                $rs =  $quuery->row_array();
                return $rs;
            }
        } 
        else
         { 

            
            $this->db->select("*")->from("tb_tickets");
            $this->db->join('tb_tenant', 'tb_tenant.idTenant = tb_tickets.idTenantKf', 'left');
            $this->db->join('tb_typeticket', 'tb_typeticket.idTypeTicket = tb_tickets.idTypeTicketKf', 'left');
            $this->db->join('tb_type_delivery', 'tb_type_delivery.idTypeDelivery = tb_tickets.idTypeDeliveryKf', 'left');
            $this->db->join('tb_reason_disabled_item', 'tb_reason_disabled_item.idReasonDisabledItem = tb_tickets.idReasonDisabledItemKf', 'left');
            $this->db->join('tb_user a', 'a.idUser = tb_tickets.idUserCompany', 'left');
            $this->db->join('tb_user b', 'b.idUser = tb_tickets.idOWnerKf', 'left');
            $this->db->join('tb_user c', 'c.idUser = tb_tickets.idUserEnterpriceKf', 'left');
            $this->db->join('tb_user d', 'd.idUser = tb_tickets.idUserAdminKf', 'left');
			$this->db->join('tb_type_services', 'tb_type_services.idTypeServices = tb_tickets.idTypeServicesKf', 'left');
			$this->db->where("tb_tickets.idStatusTicketKf !=", -1);



            /* Busqueda por filtro */
            if (!is_null($searchFilter['searchFilter'])) 
            {
            	if(@$searchFilter['idTypeTicketKf'] > 0)
				{
            		$this->db->where("tb_tickets.idTypeTicketKf !=", @$searchFilter['idTypeTicketKf']);
            	}

            	if(@$searchFilter['idProfileKf'] > 0)
				{
            		$this->db->where("tb_tickets.idProfileKf !=", @$searchFilter['idProfileKf']);
            	}


            	/*$this->db->like('tb_tenant.fullNameTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.phoneNumberTenant', $searchFilter['searchFilter']);
                $this->db->or_like('tb_tenant.emailTenant', $searchFilter['searchFilter']);

				if(@$searchFilter['idTypeKf'] > 0)
				{
					 $this->db->or_where('tb_tenant.idTypeKf', $searchFilter['idTypeKf']);
				} 
				
				if(@$searchFilter['idDepartmentKf'] > 0)
				{
					 $this->db->or_where('tb_tenant.idDepartmentKf', $searchFilter['idDepartmentKf']);
				}  */              
               
                
            }


            // Si recibimos un limite //
            if ($searchFilter['topFilter'] > 0) {
                $this->db->limit($searchFilter['topFilter']);
            } 

            $quuery = $this->db->order_by("tb_tickets.idTicket", "DESC")->get();


            if ($quuery->num_rows() > 0) {
                return $quuery->result_array();
            }
            return null;
        }
    }


     /* LISTADO DE FILTROS */

    public function getFilterForm() {

        $user = null;
        $reason_disabled_item = null;
        $typedelivery = null;
        $typeouther  = null;
        $typeticket = null;

        /* LISTADO DE CONDICIONES DE IVA */
        $query = $this->db->select("*")->from("tb_user")->get();
        if ($query->num_rows() > 0) {
            $user = $query->result_array();
        }

        /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_reason_disabled_item")->get();
        if ($query->num_rows() > 0) {
            $reason_disabled_item = $query->result_array();
        }


         /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_type_delivery")->get();
        if ($query->num_rows() > 0) {
            $typedelivery = $query->result_array();
        }

        /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_type_outher")->get();
        if ($query->num_rows() > 0) {
            $typeouther = $query->result_array();
        }

         /* LISTADO DE CONDICIONES DE TYPOS DE TARJETAS */
        $query = $this->db->select("*")->from("tb_typeticket")->get();
        if ($query->num_rows() > 0) {
            $typeticket = $query->result_array();
        }

       

        $filter = array(
            'user'         => $user,
            'reason_disabled_item'      => $reason_disabled_item,
            'typedelivery' => $typedelivery,
            'typeouther' => $typeouther,
            'typeticket'  => $typeticket

        );

        return $filter;
    }


}
?>
