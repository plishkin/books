<?php

namespace App\Controller;

use App\Entity\IRestful;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping\Entity;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiRestfulController extends AbstractController
{
    #[Route('/api/restful/{entityName}', name: 'api_restful_index', methods: ["GET"])]
    public function index(string $entityName, ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var string|Entity|IRestful $class */
        $class = 'App\Entity\\'.$entityName;
        if (class_exists($class)) {
            $perPage = ($perPage = $request->query->getInt('perPage')) && $perPage > 0 && $perPage <= 100 ? $perPage : 12;
            $pageNo = ($pageNo = $request->query->getInt('pageNo')) && $pageNo > 0 && $pageNo <= 10 ? $pageNo : 1;
            $sort= $request->get('sort') === '-' ? 'DESC' : 'ASC';

            /** @var EntityRepository $repository */
            $repository = $entityManager->getRepository($class);
            $entities = $repository->createQueryBuilder('e')
                ->orderBy('e.id', $sort)
                ->setMaxResults($perPage)
                ->setFirstResult(($pageNo - 1) * $perPage)
                ->getQuery()
                ->getResult();

            $totalCount = $entityManager->createQueryBuilder()
                ->select('count(e.id)')
                ->from($class, 'e')
                ->getQuery()
                ->getSingleColumnResult()[0];

            /** @var Entity[]|IRestful[] $entities */
            $c = 0;
            $items = [];
            foreach ($entities as $entity) {
                $c++;
                $items[] = $entity->toRestfulArray();
            }

            return $this->json([
                'success' => true,
                'message' => "Found $entityName",
                'totalCount' => $totalCount,
                'itemsCount' => $c,
                'perPage' => $perPage,
                'pageNo' => $pageNo,
                'items' => $items,
            ]);
        }
        return $this->json([
            'success' => false,
            'message' => "Couldn't find $entityName",
            'totalCount' => 0,
            'itemsCount' => 0,
            'perPage' => 0,
            'pageNo' => 0,
            'items' => [],
        ]);
    }

    /**
     * @Route("/api/restful/{entityName}", name="api_restful_create", methods={"POST"})
     */
    public function create(string $entityName, ManagerRegistry $doctrine, Request $request, ValidatorInterface $validator): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var string|Entity|IRestful $class */
        $class = 'App\Entity\\'.$entityName;
        $errs = [];
        if (class_exists($class) && ($entity = new $class()) && $entity instanceof IRestful) {
            /** @var Entity|IRestful $entity */
            $arr = json_decode($request->getContent(), true);
            if ($arr) {
                $entity->fromRestfulArray($arr);
                $errors = $validator->validate($entity);
                $entityManager->persist($entity);
                if (!count($errors)) {
                    $entityManager->flush();
                    return $this->json([
                        'success' => true,
                        'message' => "Created new $entityName successfully with id " . $entity->getId(),
                        'item' => $entity->toRestfulArray(),
                    ]);
                }
                foreach ($errors as $error) {
                    $errs[] = $error->getMessage();
                }
            } else {
                $errs[] = "Request has an empty body";
            }
        } else {
            $errs[] = "$entityName does not exists";
        }
        return $this->json([
            'success' => false,
            'message' => "Couldn't create a new $entityName",
            'errors' => $errs,
        ]);
    }

    /**
     * @Route("/api/restful/{entityName}/{id}", name="api_restful_read", methods={"GET"})
     */
    public function read(ManagerRegistry $doctrine, string $entityName, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var string|Entity|IRestful $class */
        $class = 'App\Entity\\'.$entityName;
        $errs = [];
        if (class_exists($class)) {
            /** @var Entity|IRestful $entity */
            $entity = $entityManager->getRepository($class)->find($id);
            if ($entity instanceof IRestful) {
                return $this->json([
                    'success' => true,
                    'message' => "Read the $entityName successfully with id " . $entity->getId(),
                    'item' => $entity->toRestfulArray(),
                ]);
            } else {
                $errs[] = "Couldn't find a $entityName with id " . $id;
            }
        } else {
            $errs[] = "$entityName does not exists";
        }
        return $this->json([
            'success' => false,
            'message' => "Couldn't read a $entityName with id " . $id,
            'errors' => $errs,
        ], 404);
    }

    /**
     * @Route("/api/restful/{entityName}/{id}", name="api_restful_update", methods={"PUT"})
     */
    public function update(ManagerRegistry $doctrine, Request $request, string $entityName, int $id, ValidatorInterface $validator): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var string|Entity|IRestful $class */
        $class = 'App\Entity\\'.$entityName;
        $errs = [];
        if (class_exists($class)) {
            /** @var Entity|IRestful $entity */
            $entity = $entityManager->getRepository($class)->find($id);
            if ($entity instanceof IRestful) {
                $arr = json_decode($request->getContent(), true);
                $entity->fromRestfulArray($arr);
                $errors = $validator->validate($entity);
                $entityManager->persist($entity);
                if (!count($errors)) {
                    $entityManager->flush();
                    return $this->json([
                        'success' => true,
                        'message' => "Updated the $entityName successfully with id " . $entity->getId(),
                        'item' => $entity->toRestfulArray(),
                    ]);
                }
                foreach ($errors as $error) {
                    $errs[] = $error->getMessage();
                }
            } else {
                $errs[] = "Couldn't find a $entityName with id " . $id;
            }
        } else {
            $errs[] = "$entityName does not exists";
        }

        return $this->json([
            'success' => false,
            'message' => "Couldn't update a $entityName with id " . $id,
            'errors' => $errs,
        ], 404);
    }

    /**
     * @Route("/api/restful/{entityName}/{id}", name="api_restful_delete", methods={"DELETE"})
     */
    public function delete(ManagerRegistry $doctrine, string $entityName, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        /** @var string|Entity|IRestful $class */
        $class = 'App\Entity\\'.$entityName;
        $errs = [];
        if (class_exists($class)) {
            /** @var Entity|IRestful $entity */
            $entity = $entityManager->getRepository($class)->find($id);
            if ($entity instanceof IRestful) {
                $entityManager->remove($entity);
                $entityManager->flush();
                return $this->json([
                    'success' => true,
                    'message' => "Deleted the $entityName successfully with id " . $id,
                    'item' => ['id' => $id],
                ]);
            } else {
                $errs[] = "Couldn't find a $entityName with id " . $id;
            }
        } else {
            $errs[] = "$entityName does not exists";
        }
        return $this->json([
            'success' => false,
            'message' => "Couldn't find a $entityName with id " . $id,
            'errors' => $errs,
        ], 404);
    }

}
