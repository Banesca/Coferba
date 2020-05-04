<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Product_model extends CI_Model
{
	
	public function __construct()
	{
		parent::__construct();
	}

	public function add($product) {

		$user = null;

		$this->db->select("*")->from("tb_products");
		$query = $this->db->where("tb_products.descriptionProduct =", $product['descriptionProduct'])->get();
		if($query->num_rows() < 1){ 
		   
			    

			$this->db->insert('tb_products', array(
				'descriptionProduct' => $product['descriptionProduct'] ,
				'codigoFabric' => $product['codigoFabric'] ,
				'brand' => $product['brand'] ,
				'model' => $product['model'] ,
				'idProductClassificationFk' => $product['idProductClassificationFk'] ,
				'isNumberSerieFabric' => $product['isNumberSerieFabric'] ,
				'isNumberSerieInternal' => $product['isNumberSerieInternal'] ,
				'isDateExpiration' => $product['isDateExpiration'] ,
				'isControlSchedule' => $product['isControlSchedule'] ,
				'priceFabric' => $product['priceFabric']	
				)
			);

			if ($this->db->affected_rows() === 1) {
				$idProductFk = $this->db->insert_id();

				if(count(@$product['list_id_divice']) > 0)
				{
					foreach ($product['list_id_divice'] as $valor) {
						
						$this->db->insert('tb_products_divice_opening', array(
							'idProductFk' => $idProductFk,
							'idDiviceOpeningFk' => $valor['idDiviceOpeningFk'])
						);
					}
				}
				return 1;
			} else {
				return 0;
			}
			
		} else{
			return 2;
		}
	
	   
	}

	public function update($product) {

		$this->db->set(
				array(
					'descriptionProduct' => $product['descriptionProduct'] ,
					'codigoFabric' => $product['codigoFabric'] ,
					'brand' => $product['brand'] ,
					'model' => $product['model'] ,
					'idProductClassificationFk' => $product['idProductClassificationFk'],
					'isNumberSerieFabric' => $product['isNumberSerieFabric'] ,
					'isNumberSerieInternal' => $product['isNumberSerieInternal'] ,
					'isDateExpiration' => $product['isDateExpiration'] ,
					'isControlSchedule' => $product['isControlSchedule'] ,
					'priceFabric' => $product['priceFabric']	
				)
		)->where("idProduct", $product['idProduct'])->update("tb_products");

			if($product['idProductClassificationFk']==3){
				if(count(@$product['list_id_divice']) > 0)
					{
						$this->db->delete('tb_products_divice_opening', array('idProductFk' => $product['idProduct']));  

						foreach ($product['list_id_divice'] as $valor) {
							
							$this->db->insert('tb_products_divice_opening', array(
								'idProductFk' => $product['idProduct'],
								'idDiviceOpeningFk' => $valor['idDiviceOpeningFk'])
							);
						}
						return true;
					}
			}else{
				return true;
			}
		
	}

	public function delete($idProduct) {

		$this->db->set(
			array('idStatusFk' =>  -1))->where("idProduct", $idProduct)->update("tb_products"); 
		return true;
				
		
	}

	public function get($id = null, $searchFilter = null) {
		$quuery = null;
		$rs = null;

		if (!is_null($id)) 
		{

			$this->db->select("*")->from("tb_products");
			$this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
			$quuery = $this->db->where("tb_products.idProduct =", $id)->get();


			if ($quuery->num_rows() === 1) {
				$rs =  $quuery->row_array();


				$this->db->select("*")->from("tb_products_divice_opening");
				$this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
				$this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
				$quuery = $this->db->where("tb_products_divice_opening.idProductFk =", $id)->get();

				$rs2 =  $quuery->result_array();

				$rs['diviceOpening'] =  $rs2;

				return $rs;
			}
			return null;
		}else
		{ 

			$this->db->select("*")->from("tb_products");
			$this->db->join('tb_products_classification', 'tb_products_classification.idProductClassification = tb_products.idProductClassificationFk', 'inner');
			$this->db->where("tb_products.idStatusFk !=", -1);

	  
				/* Busqueda por filtro */
				if (!is_null($searchFilter['searchFilter'])) 
				{
					$this->db->like('tb_products.descriptionProduct', $searchFilter['searchFilter']);
				}


		   $quuery = $this->db->order_by("tb_products.idProduct", "ASC")->get();


		   if ($quuery->num_rows() > 0) {

				$rs =  $quuery->result_array();

				$list =  array();

				$i = 0;
				foreach ($quuery->result() as &$row){

					$this->db->select("*")->from("tb_products_divice_opening");
					$this->db->join('tb_products', 'tb_products.idProduct = tb_products_divice_opening.idProductFk', 'inner');
					$this->db->join('tb_divice_opening', 'tb_divice_opening.idDiviceOpening = tb_products_divice_opening.idDiviceOpeningFk', 'inner');
					$quuery = $this->db->where("tb_products_divice_opening.idProductFk =", $row->idProduct)->get();

					$rs2 =  $quuery->result_array();
					$rs[$i]['diviceOpening'] =  $rs2;
					$i++;
				}
				

			   return $rs;
		   }
		   return null;
	   }
	}
}


	 